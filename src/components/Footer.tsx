import { LocalPhone, Email } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="flex justify-between items-center gap-12 px-16 py-3 w-full bg-accent-50 bg-opacity-50">
            <Link to='/'>
                <img className="max-w-36 max-h-36" src="/assets/images/logo/logo192.png" alt="Logo" />
            </Link>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Useful Links</h3>
                <ul className="flex flex-col gap-3 text-accent">
                    <li className="cursor-pointer hover:text-accent-600">About Us</li>
                    <li className="cursor-pointer hover:text-accent-600">Terms and Conditions</li>
                    <li className="cursor-pointer hover:text-accent-600">Return and Refund Policy</li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold">Contact</h3>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-5">
                        <LocalPhone />
                        <p>+1 234 567 890</p>
                    </div>
                    <div className="flex gap-5">
                        <Email />
                        <p>placefinder@support.com</p>
                    </div>
                    <img src="/assets/images/payment.png" alt="Payment Methods" />
                </div>
            </div>
        </div>
    );
};

export default Footer;