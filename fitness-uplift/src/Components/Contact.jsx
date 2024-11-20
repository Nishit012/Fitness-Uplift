import React from "react";
function Contact() {
    return (
        <div id="contact">
            <h1>CONTACT US</h1>
            <form>
                <input type="text" placeholder="Full name" required/>
                <input type="email" placeholder="ex. abc@xyz.com" required/>
                <textarea placeholder="Write here..."></textarea>
                <input type="submit" value="Send"/>
            </form>
        </div>
    )
}
export default Contact;

