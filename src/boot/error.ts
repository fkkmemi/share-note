import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot(async ({ app }) => {
  app.config.errorHandler = err => {
    const message = err instanceof Error ? err.message : 'unknown error'
    Notify.create(message)
  }
})
