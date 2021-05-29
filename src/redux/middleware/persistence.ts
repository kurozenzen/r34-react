import { MiddlewareAPI } from 'redux'
import { Dispatch } from 'react'
import {
  AppAction,
  FETCH_PREFERENCES,
  savePreferences,
  SAVE_PREFERENCES,
  setPreferences,
  SET_PREFERENCE,
} from '../actions'
import { PreferenceKey } from '../../data/types'

let saveTimeout: NodeJS.Timeout

const persistence = (store: MiddlewareAPI) => (next: Dispatch<AppAction>) => async (action: AppAction) => {
  if (action.type === SET_PREFERENCE) {
    if (saveTimeout) {
      clearTimeout(saveTimeout)
    }

    saveTimeout = setTimeout(() => {
      store.dispatch(savePreferences())
    }, 1000)
  }

  if (action.type === FETCH_PREFERENCES) {
    const auth = gapi?.auth2?.getAuthInstance()
    if (auth) {
      if (auth.isSignedIn) {
        gapi.load('client', async () => {
          await gapi.client.init({})
          await gapi.client.load('drive', 'v3')

          const appDataResponse = await gapi.client.drive.files.list({ spaces: 'appDataFolder' })
          const fileId = appDataResponse.result?.files?.[0].id

          if (fileId) {
            const preferenceFile = await gapi.client.drive.files.get({ fileId, alt: 'media' })

            store.dispatch(setPreferences(preferenceFile.result as Record<PreferenceKey, any>))
          }
        })
      }
    }
  }

  if (action.type === SAVE_PREFERENCES) {
    console.log('Saving')
    const auth = gapi?.auth2?.getAuthInstance()
    if (auth) {
      if (auth.isSignedIn) {
        gapi.load('client', async () => {
          await gapi.client.init({})
          await gapi.client.load('drive', 'v3')

          const preferences = store.getState().preferences

          const appDataResponse = await gapi.client.drive.files.list({ spaces: 'appDataFolder' })

          const fileId: string | undefined = await new Promise(async (resolve) => {
            if (appDataResponse.result.files?.length === 0) {
              const res = await gapi.client.drive.files.create({
                fields: 'id',
                resource: {
                  name: 'r34-mobile-preferences.json',
                  parents: ['appDataFolder'],
                  mimeType: 'application/json',
                },
              })

              resolve(res.result.id)
            } else {
              resolve(appDataResponse.result?.files?.[0].id)
            }
          })

          if (fileId) {
            await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
              method: 'PATCH',
              headers: new Headers({ Authorization: `Bearer ${gapi.auth.getToken().access_token}` }),
              body: JSON.stringify(preferences),
            })
          }
        })
      }
    }
  }

  next(action)
}

export default persistence
