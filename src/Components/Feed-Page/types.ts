export interface User {
  id: number
  username: string
  display_name: string
  profile_picture: string | null
  followers_count: number
  following_count: number
}

export interface Post {
  id: number
  author: User
  content: string
  created_at: string
  is_liked: boolean
  likes_count: number
  comments_count: number
  image?: string | null
}

export interface SearchResults {
  users: User[]
  posts: Post[]
}
