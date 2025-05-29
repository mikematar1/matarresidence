import { Link } from "react-router-dom";

// Icons
import { MdMarkEmailUnread } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { BiPhotoAlbum } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { GoLaw } from "react-icons/go";

const Options = () => {
	return (
		<div className='container'>
			<div className='account-container'>
				<div className='account-section'>
					<h2>Account settings</h2>
					<h5>Manage your booking experience</h5>
					<div className='settings-container'>
						<Link to='/options/preferences' className='settings-box'>
							<IoMdOptions className='settings-icon' />
							<div className='settings-content'>
								<h3>Preferences</h3>
								<p>Add or remove languags, currencies and payment options</p>
								<div className='settings-link'>Manage preferences</div>
							</div>
						</Link>
						<Link to='/options/gallery' className='settings-box'>
							<BiPhotoAlbum className='settings-icon' />
							<div className='settings-content'>
								<h3>Photo gallery</h3>
								<p>Update your photo gallery</p>
								<div className='settings-link'>Manage photo gallery</div>
							</div>
						</Link>
						<Link to='/options/marketing' className='settings-box'>
							<MdMarkEmailUnread className='settings-icon' />
							<div className='settings-content'>
								<h3>Email marketing</h3>
								<p>Launch email marketing campaign</p>
								<div className='settings-link'>Manage email marketing</div>
							</div>
						</Link>
						<Link to='/options/faqs_policies' className='settings-box'>
							<FaQuestion className='settings-icon' />
							<div className='settings-content'>
								<h3>FAQ & Policies</h3>
								<p>Add, remove and edit FAQs and policies</p>
								<div className='settings-link'>Manage FAQ & Policies</div>
							</div>
						</Link>
						<Link to='/options/regulation_disaster' className='settings-box'>
							<GoLaw className='settings-icon' />
							<div className='settings-content'>
								<h3>Regulations & Disaster response plan</h3>
								<p>
									Add, remove and edit regulation and disaster response plane
								</p>
								<div className='settings-link'>
									Manage Regulations & Disaster response plan
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Options;
