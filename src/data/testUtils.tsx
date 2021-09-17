import { Post } from 'r34-types'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { store } from '../redux/store'
import { themes } from 'r34-branding'
import { NO_OP } from './types'

type Item = {
  callback: IntersectionObserverCallback
  elements: Set<Element>
  created: number
}

const observers = new Map<IntersectionObserver, Item>()

export const getStore = () => store

export const getDefaultPost = () =>
  ({
    change: 0,
    comments_url: '',
    created_at: '',
    creator_id: 1,
    file_url: '',
    has_children: false,
    has_comments: false,
    has_notes: false,
    height: 1,
    id: 1,
    md5: '',
    owner_url: '',
    parent_id: null,
    preview_height: 1,
    preview_url: '',
    preview_width: 1,
    rating: 's',
    sample_height: 1,
    sample_url: '',
    sample_width: 1,
    score: 0,
    source: '',
    status: 'active',
    tags: ['tag1', 'tag2'],
    type: 'image',
    width: 1,
  } as Post)

export function TestWrapper(props: {
  children: JSX.Element
  withTheme?: boolean
  withStore?: boolean
  withRouter?: boolean
}) {
  let result = props.children

  if (props.withRouter) {
    result = <HashRouter>{result}</HashRouter>
  }

  if (props.withTheme) {
    result = <ThemeProvider theme={themes.dark}>{result}</ThemeProvider>
  }

  if (props.withStore) {
    result = <Provider store={store}>{result}</Provider>
  }

  return result
}

export function mockIntersectionObserver() {
  beforeEach(() => {
    /**
     * Create a custom IntersectionObserver mock, allowing us to intercept the observe and unobserve calls.
     * We keep track of the elements being observed, so when `mockAllIsIntersecting` is triggered it will
     * know which elements to trigger the event on.
     */
    global.IntersectionObserver = jest.fn((cb, options = {}) => {
      const item = {
        callback: cb,
        elements: new Set<Element>(),
        created: Date.now(),
      }
      const instance: IntersectionObserver = {
        thresholds: Array.isArray(options.threshold) ? options.threshold : [options.threshold ?? 0],
        root: options.root ?? null,
        rootMargin: options.rootMargin ?? '',
        observe: jest.fn((element: Element) => {
          item.elements.add(element)
        }),
        unobserve: jest.fn((element: Element) => {
          item.elements.delete(element)
        }),
        disconnect: jest.fn(() => {
          observers.delete(instance)
        }),
        takeRecords: jest.fn(),
      }

      observers.set(instance, item)

      return instance
    })
  })

  afterEach(() => {
    // @ts-ignore
    global.IntersectionObserver.mockClear()
    observers.clear()
  })
}

export function mockLocation() {
  //@ts-expect-error
  window.location = {
    assign: NO_OP,
    hash: '#/',
    host: 'localhost:3000',
    hostname: 'localhost',
    href: 'http://localhost:3000/r34-react#/',
    origin: 'http://localhost:3000',
    pathname: '/r34-react',
    port: '3000',
    protocol: 'http:',
    reload: NO_OP,
    replace: NO_OP,
    search: '',
  }
}
