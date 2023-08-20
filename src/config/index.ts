let config: Record<string, string | undefined> = {
  name: 'Todo',
  unauthenticated_route: '/users/login',
  authenticated_route: '/',
  base_url: process.env.NEXT_PUBLIC_BASE_URL,
  server_prod_url: process.env.NEXT_PROD_SERVER_URL,
  server_url: process.env.NEXT_PUBLIC_SERVER_URL,
}

export default config
