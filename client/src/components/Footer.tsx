import { HideFooter } from "../lib/constants";
import { Link, useLocation } from "react-router-dom";
import { LocalPhone, Email, LocationCity } from "@mui/icons-material";

const Footer = () => {
    const location = useLocation();

    if (HideFooter.includes(location.pathname)) return <></>;

    return (
        <div className="footer">
            <Link className="max-tab:hidden" to='/'>
                <img className="max-w-36 max-h-36 max-lap:max-w-28 max-lap:max-h-28"
                    src="/assets/images/logo/logo192.png" alt="Logo" />
            </Link>

            <div className="flex flex-col gap-4 max-ml:gap-3">
                <h3 className="font-bold text-foreground opacity-60">Useful Links</h3>
                <ul className="flex flex-col gap-3 max-ml:gap-2">
                    <li className="footer-link">About Us</li>
                    <li className="footer-link">Terms and Conditions</li>
                    <li className="footer-link">Return and Refund Policy</li>
                    <li className="footer-link">Careers</li>
                </ul>
            </div>

            <div className="flex flex-col w-[297px] gap-4 max-ml:gap-3">
                <h3 className="font-bold opacity-60">Contact</h3>
                <div className="flex flex-col gap-3 max-ml:gap-2">
                    <div className="flex gap-5 max-ml:gap-3">
                        <LocalPhone />
                        <p>+1 234 567 890</p>
                    </div>
                    <div className="flex gap-5 max-ml:gap-3">
                        <Email />
                        <p>placefinder@support.com</p>
                    </div>
                    <div className="flex gap-5 max-ml:gap-3">
                        <LocationCity />
                        <p>1234 Street Name City, AA 99999</p>
                    </div>
                    <div className="h-8 max-ml:h-6">
                        <img className="h-full" src="/assets/images/payment.png" alt="Payment Methods" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;