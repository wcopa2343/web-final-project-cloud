import {
  fetchNotifications,
  markAllNotificationsAsRead,
  markViewedNotification,
  notificationsSlice,
} from '../redux/notificationsSlice'

describe('Notifications Slice', () => {
  it('Get notifications fullfilled 1', () => {
    const action = fetchNotifications.fulfilled({
      count: 1,
      notifications: [{ IsNew: true }, { IsNew: false }, { IsNew: true }],
    })

    expect(
      notificationsSlice.reducer(
        {
          isNew: 0,
          notifications: [],
          update: false,
        },
        action,
      ),
    ).toEqual({
      isNew: 2,
      notifications: [{ IsNew: true }, { IsNew: false }, { IsNew: true }],
      update: false,
    })
  })

  it('Get notifications fullfilled 2', () => {
    const action = fetchNotifications.fulfilled({
      count: 1,
      notifications: [{ IsNew: true }, { IsNew: true }, { IsNew: true }],
    })

    expect(
      notificationsSlice.reducer(
        {
          isNew: 0,
          notifications: [],
          update: false,
        },
        action,
      ),
    ).toEqual({
      isNew: 3,
      notifications: [{ IsNew: true }, { IsNew: true }, { IsNew: true }],
      update: false,
    })
  })

  it('Mark notification read fullfilled 1', () => {
    const action = markViewedNotification.fulfilled({})

    expect(
      notificationsSlice.reducer(
        {
          isNew: 0,
          notifications: [{ IsNew: false }],
          update: false,
        },
        action,
      ),
    ).toEqual({
      isNew: 0,
      notifications: [{ IsNew: false }],
      update: true,
    })
  })

  it('Mark all notifications as read fullfilled', () => {
    const action = markAllNotificationsAsRead.fulfilled({})

    expect(
      notificationsSlice.reducer(
        {
          isNew: 0,
          notifications: [{ IsNew: false }],
          update: false,
        },
        action,
      ),
    ).toEqual({
      isNew: 0,
      notifications: [{ IsNew: false }],
      update: true,
    })
  })
})
