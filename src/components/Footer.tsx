import { LocalPhone, Email } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="flex justify-between items-center gap-12 px-16 py-2">
            <div className="max-w-sm">
                <Link to='/'>
                    <img className="max-w-36 mb-5" src="/assets/logo.png" alt="logo" />
                </Link>
            </div>
            <div>
                <h3>Useful Links</h3>
                <ul className="mt-5 cursor-pointer">
                    <li>About Us</li>
                    <li>Terms and Conditions</li>
                    <li>Return and Refund Policy</li>
                </ul>
            </div>

            <div className="max-w-[350px]">
                <h3 className="mb-5">Contact</h3>
                <div className="flex">
                    <LocalPhone />
                    <p className="ml-5 mb-4">+1 234 567 890</p>
                </div>
                <div className="flex">
                    <Email />
                    <p className="ml-5 mb-4">placefinder@support.com</p>
                </div>
                <img src="/assets/images/payment.png" alt="payment" />
            </div>
        </div>
    );
};

export default Footer;