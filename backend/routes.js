
import authRoute from './Routes/auth.js'
import doctorRoute from './Routes/doctor.js';
import reviewRoute from './Routes/review.js';
import userRoute from './Routes/user.js'
import 'dotenv/config.js'

const routes = (app)=>{

  app.use(`${process.env.API_VERSION}/auth`,authRoute)
  app.use(`${process.env.API_VERSION}/users`,userRoute)
  app.use(`${process.env.API_VERSION}/doctors`,doctorRoute)
  app.use(`${process.env.API_VERSION}/reviews`,reviewRoute)
  
}

export default routes
