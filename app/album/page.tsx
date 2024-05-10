import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import PhotoAlbumLayout from '@/layouts/PhotoAlbumLayout'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Album' })

export default function AlbumPage() {
  const posts = allCoreContent(sortPosts(allBlogs, 'lastmod'))

  return <PhotoAlbumLayout posts={posts.filter((post) => post.images?.length > 0)} />
}
