import { vapi } from "src/boot/axios";

export default {
  info: (data) => vapi.get('/info', data).then( done => done ).catch( fail => fail.response )
}
