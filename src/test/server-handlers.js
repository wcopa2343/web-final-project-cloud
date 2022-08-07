import { rest } from 'msw'

import { HttpStatuses } from '../redux/types'

const ExitLoginResponse = {
  userId: 41,
  userName: 'usertest',
  email: 'usertest@test.com',
  pictureUrlProfile:
    'https://res.cloudinary.com/dyiqhlylf/image/upload/v1609943915/eventsMedia/o7kceikegnbn0zyr0imx.jpg',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InByaW5mbmVsc29uIiwiaWQiOiI0MSIsInVzZXJlbWFpbCI6Im5lbHNvbi5wYWNoZWNvQGphbGEtZm91bmRhdGlvbi5vcmciLCJuYmYiOjE2MTA3Mjk5MjAsImV4cCI6MTYxMDczMzUyMCwiaWF0IjoxNjEwNzI5OTIwLCJpc3MiOiJodHRwOi8vYm9vdGNhbXAtamFsYXNvZnQuY29tIiwiYXVkIjoiR2F0ZXdheSJ9.0w7qCdX-kFe2HrKFWoiirJRBiB0SHytwsONuzsoXxow',
}
const delay = 1000
let route
if (process.env.REACT_APP_API !== undefined) {
  route = process.env.REACT_APP_API
} else {
  route = 'http://actio.test/v1.0'
}

const handlers = [
  rest.post(`${route}/token`, async (req, res, ctx) => {
    return res(
      ctx.delay(delay),
      ctx.status(HttpStatuses.OK),
      ctx.json(ExitLoginResponse),
    )
  }),
]

export { handlers }
