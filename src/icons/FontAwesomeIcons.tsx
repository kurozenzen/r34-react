import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
  faDeviantart,
  faDiscord,
  faGithub,
  faGoogle,
  faPatreon,
  faTumblr,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import {
  faArrowRight,
  faArrowUp,
  faBackward,
  faCalendarDay,
  faCaretDown,
  faCheckCircle,
  faCheckSquare,
  faCodeBranch,
  faCog,
  faCopy,
  faCopyright,
  faDownload,
  faExpand,
  faExternalLinkAlt,
  faForward,
  faHashtag,
  faHeart,
  faImage,
  faInfoCircle,
  faLink,
  faPen,
  faPlus,
  faRegistered,
  faScroll,
  faSearch,
  faShareAlt,
  faSignOutAlt,
  faTags,
  faTimes,
  faTimesCircle,
  faUndoAlt,
  faUser,
  faUserShield,
  faWrench,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React from 'react'

/**
 * Component factory that shortens the definition of a new icon considerably
 */
const bindIcon = (icon: IconProp) =>
  React.memo((props: Omit<FontAwesomeIconProps, 'icon'>) => (
    <FontAwesomeIcon data-testid='icon' icon={icon} {...props} />
  ))

export const ArrowDown = bindIcon(faCaretDown)
export const ArtistIcon = bindIcon(faPen)
export const CalendarIcon = bindIcon(faCalendarDay)
export const CharacterIcon = bindIcon(faUser)
export const CheckIcon = bindIcon(faCheckSquare)
export const CloseIcon = bindIcon(faTimes)
export const CodeBranchIcon = bindIcon(faCodeBranch)
export const CopyIcon = bindIcon(faCopy)
export const CopyrightIcon = bindIcon(faCopyright)
export const DeviantArtIcon = bindIcon(faDeviantart)
export const DiscordIcon = bindIcon(faDiscord)
export const DownloadIcon = bindIcon(faDownload)
export const ExpandIcon = bindIcon(faExpand)
export const ExternalLinkIcon = bindIcon(faExternalLinkAlt)
export const FailedIcon = bindIcon(faTimesCircle)
export const GithubIcon = bindIcon(faGithub)
export const GoogleIcon = bindIcon(faGoogle)
export const HeartIcon = bindIcon(faHeart)
export const ImageIcon = bindIcon(faImage)
export const LinkIcon = bindIcon(faLink)
export const MetaDataIcon = bindIcon(faInfoCircle)
export const PatreonIcon = bindIcon(faPatreon)
export const PlusIcon = bindIcon(faPlus)
export const PrivacyIcon = bindIcon(faUserShield)
export const RatingIcon = bindIcon(faRegistered)
export const SearchIcon = bindIcon(faSearch)
export const PreferencesIcon = bindIcon(faCog)
export const ShareIcon = bindIcon(faShareAlt)
export const SignOutIcon = bindIcon(faSignOutAlt)
export const SourceIcon = bindIcon(faHashtag)
export const SuccessIcon = bindIcon(faCheckCircle)
export const SupertagIcon = bindIcon(faTags)
export const TermsIcon = bindIcon(faScroll)
export const TumblrIcon = bindIcon(faTumblr)
export const TwitterIcon = bindIcon(faTwitter)
export const UndoIcon = bindIcon(faUndoAlt)
export const WrenchIcon = bindIcon(faWrench)
export const ForwardIcon = bindIcon(faForward)
export const BackwardIcon = bindIcon(faBackward)
export const SubmitIcon = bindIcon(faArrowRight)
export const ArrowUp = bindIcon(faArrowUp)
