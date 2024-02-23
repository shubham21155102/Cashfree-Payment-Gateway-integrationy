import React, { useEffect, useState } from 'react';
import { cashfree } from './utils';
import { useParams } from 'react-router-dom';
import "./css.css"
const App = () => {
    const params = useParams()
    const isSessionId = params.sessionid
    // eslint-disable-next-line no-unused-vars
    const [sessionId, setSessionId] = useState('');
     // eslint-disable-next-line no-unused-vars
    const [orderId, setOrderId] = useState('');
    const [customer_name, setCustomerName] = useState('');
    const [customer_phone, setCustomerPhone] = useState('');
    const [customer_email, setCustomerEmail] = useState('')
    const [order_amount, setOrderAmount] = useState('');
    const [order_note, setOrderNote] = useState('');
    const [allset, setAllSet] = useState(false);
    const order={
        "customer_id": "006d7609-5007-4323-95a9-e8210fc489e7",
        "customer_name": "Shubham Kumar",
        "customer_phone": "6201060889",
        "customer_email": "resoshubham2002@gmail.com",
        "order_amount": "1",
        "order_note": "Hello This is test"
    }
    // ngrok http --domain=shiner-enjoyed-stinkbug.ngrok-free.app 80
    const handleSubmitDetails = async (e) => {
      e.preventDefault();
      setAllSet(true);
  
      try {
          const requestBody = {
              customer_id: order.customer_id,
              customer_name: customer_name,
              customer_phone: customer_phone,
              customer_email: customer_email,
              order_amount: order_amount,
              order_note: order_note
          };
          const response = await fetch("http://shiner-enjoyed-stinkbug.ngrok-free.app/merchant-app/newpayment", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(requestBody)
          });
          if (!response.ok) {
              throw new Error('Failed to submit payment details');
          }
          const responseData = await response.json();
          const paymentSessionId = responseData.payment_details.payment_session_id;
          const orderId = responseData.payment_details.order_id;
          setSessionId(paymentSessionId);
          setOrderId(orderId);
          const checkoutOptions = {
              paymentSessionId: paymentSessionId,
              returnUrl: `http://shiner-enjoyed-stinkbug.ngrok-free.app/checkstatus?orderId=${orderId}`
          };
          const result = await cashfree.checkout(checkoutOptions);
          if (result.error) {
              alert(result.error.message);
          } else if (result.redirect) {
              console.log("Redirection");
              console.log(result);
          }
      } catch (error) {
          console.error('Error:', error.message);
      } finally {
          setAllSet(false);
      }
  };

    useEffect(()=>{
        setSessionId(isSessionId)
    }, [isSessionId])

  return (
    <>
    <div className='main'>
        <div className='center'>
        {!allset?<> <form onSubmit={handleSubmitDetails}>
          <input type="text" value={customer_name} onChange={(e)=>{setCustomerName(e.target.value)}} placeholder="Customer Name" required/>
          <br/>
          <input type="text" value={customer_phone} onChange={(e)=>{setCustomerPhone(e.target.value)}} placeholder="Customer Phone" required/>
          <br/>
          <input type="text" value={customer_email} onChange={(e)=>{setCustomerEmail(e.target.value)}} placeholder="Customer Email" required/>
          <br/>
          <input type="text" value={order_amount} onChange={(e)=>{setOrderAmount(e.target.value)}} placeholder="Order Amount" required/>
          <br/>
          <input type="text" value={order_note} onChange={(e)=>{setOrderNote(e.target.value)}} placeholder="Order Note" required/>
          <br/>
          <button type="submit">Pay Now</button>
        </form></>:<>
          "Please wait while we are processing your request"
        </>}
       
            <img width={300} src={""} alt="" />
        </div>
        
    </div>
    </>
  )
}
export default App
