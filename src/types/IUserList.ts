export interface IUserList {
  id: string
  fullname: string
  avatar?: {
    _id: string
    localPath: string
    url: string
  }
  email: string
  isEmailVerified: boolean
  createdAt: string
}
