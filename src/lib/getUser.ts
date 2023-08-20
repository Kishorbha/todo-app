import config from '@/config'

const baseurl =
  process.env.APP_ENV === 'prod' ? config.server_docker_url : config.server_url

export default async function getUser(accessToken?: string) {
  return fetch(`${baseurl}/users/current-user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((res) => res)
}
