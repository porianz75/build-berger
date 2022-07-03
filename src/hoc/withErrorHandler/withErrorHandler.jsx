import React from 'react';
import Modal from '../../components/UI/Modal/Modal';


///////////////////ravash 1  ba class component ////////////////////////

// const withErrorHandler = (WrappedComponent, axios) => {
//     return class extends React.Component {
//         // constructor(props) {
//         //     super(props);
//         //     this.axireq=axios.interceptors.request.use(req => {
//         //         this.setState({ error: null });
//         //         return req;
//         //     });
//         //     this.axires= axios.interceptors.response.use(res => res, error => {
//         //         this.setState({ error: error });
//         //         console.log('aa')
//         //         return Promise.reject(error)
//         //     });
//         // }
//         state = {
//             error: null
//         }
//
//         //AZ IN Baraye tain interceptors estefade nakardim .chon zamani  method componentdidmount ejra mishe ke baraye component haye  farzand ham ejra beshe didmount shon.
//         // k aln vaghti toye component burgerbuilder error iijad beshe barash dg  componentdidmount fara khani nemishe. bara farzandash ham hamintoor.
//         // pas 2 rah darim k  az constructor estefade konim ya az componentwillmount.
//
//         // componentDidMount() {
//         //
//         //     axios.interceptors.request.use(req => {
//         //         this.setState({ error: null });
//         //         return req;
//         //     });
//         //
//         //     axios.interceptors.response.use(res => res, error => {
//         //         this.setState({ error: error });
//         //       //  return Promise.reject(error)
//         //     });
//         // }
//
//
//         componentWillMount() {
//             this.reqInterceptor = axios.interceptors.request.use(req => {
//                 console.log('111',req)
//                 this.setState({ error: null });
//                 return req;
//             });
//
//             this.resInterceptor = axios.interceptors.response.use(res => res, error => {
//                 console.log('222',error)
//                 this.setState({ error: error });
//             });
//         }
//         componentWillUnmount() {
//             axios.interceptors.request.eject(this.reqInterceptor);
//             axios.interceptors.response.eject(this.resInterceptor);
//         }
//
//         errorConfirmedHandler = () => {
//             this.setState({ error: null });
//         }
//         render() {
//             console.log('error handler')
//             return (
//                 <>
//                     <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
//                         {this.state.error ? this.state.error.message : null}
//                     </Modal>
//                     <WrappedComponent {...this.props} />
//                 </ >
//             )
//         }
//     }
// }



/////////////////// ravesh 2  ba  component fuctional ///////////////
import {useState,useEffect,useMemo} from "react";
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux";
function withErrorHandler(WrappedComponent, axios){
    return (props)=> {
        const Adispatch = useDispatch();
        const Astate = useSelector((state => state))
        const navigate =useNavigate();
        const [error, setError] = useState(null)
        // let axiosReq = useMemo(()=>{
        //     return  axios.interceptors.request.use(req=> {
        //     //    console.log('111',req)
        //         setError(null);
        //         return req
        //     });
        // },[])
        // let axiosRes = useMemo(()=>{
        //     return axios.interceptors.response.use(res => res, error => {
        //         setError(error);
        //         // return Promise.reject(error)
        //
        //     });
        // },[])

        let axiosReq = axios.interceptors.request.use(req=> {
          //  console.log('111',req)
            setError(null);
            return req;
        });
        let axiosRes = axios.interceptors.response.use(res => res, error => {
            console.log('222',error)
            setError(error);
            // return Promise.reject(error)
        });

        useEffect(()=>{
      //  to ye inja axios ro tarif nakardim chon vaghti mount ejra mishe k mount haye  farzand hame ejra shode bashan
            // k dar insorat  baad  iijad error in tanzimat niz  set khahad shod//  dar class component k asln
            // componentdidmount ejra nemish chon toye  mount farzand b error khordeim
            return ()=>{
///////////// bara  zamani k route bandi mikonim bedard mikhrore. chera k  in errorhandle b sorat sarasari darim estefade mikonim
                ///// hanoz interceptor  haye safahat ghabli dar  memory zakhire shode k ba in kar miyaym  onaro eject miknim dar lahze ummount

            axios.interceptors.request.eject(axiosReq);
            axios.interceptors.response.eject(axiosRes);
        }
        });

        let errorConfirmedHandler = () => {
            setError(null)
        }
        return (
            <>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} navigate={navigate} Adispatch={Adispatch} Astate={Astate}/>
            </ >
        )
    }

}
export default withErrorHandler;