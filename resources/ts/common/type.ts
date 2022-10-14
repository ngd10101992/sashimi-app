import type { Page, PageProps, Errors, ErrorBag } from '@inertiajs/inertia'

export interface InteriaPageType extends Page<PageProps> {
  props: {
    errors: Errors & ErrorBag
    auth: {
      user: {
        avatar: string
        email: string
        name: string
      }
    }
    flash: {
      success: { message: string }
      error: { message: string }
    }
    // laravelVersion: string
    // phpVersion: string
  }
}

export interface FlashType {
  success: { message: string }
  error: { message: string }
}

export interface UserType {
  id: string
  name: string
  email: string
  avatar: string
  isFriend: number
}
export interface ContactCodeType {
  notRelation: number
  isFriend: number
  pending: number
  confirm: number
}

export interface AuthType {
  user: UserType
}