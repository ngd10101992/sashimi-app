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
  name: string
  email: string
}

export interface AuthType {
  user: UserType
}