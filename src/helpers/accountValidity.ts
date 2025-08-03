import type { IAccountProps } from "@/types"

export const isAccountValid = (account: IAccountProps): boolean => {
  return (
    typeof account.type === 'string' && account.type.trim() !== '' &&
    typeof account.login === 'string' && account.login.trim() !== '' &&
    (account.type === 'ldap' || (typeof account.password === 'string' && account.password.trim() !== ''))
  )
}
