import app from './app'
import models from './models'
const port = process.env.PORT || 5000

// START THE SERVER
// ==============================================
models.sequelize.sync().then(() => {
    app.listen(port)
    console.log('Magic happens on port ' + port)
})
