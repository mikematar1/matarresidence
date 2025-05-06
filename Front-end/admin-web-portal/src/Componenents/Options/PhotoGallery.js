import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Icons
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin2Fill } from "react-icons/ri";

// Photo Gallery
import GetImages from "../../api-client/Options/GetImages";
import EditImages from "../../api-client/Options/EditImages";

const PhotoGallery = () => {
	const [edit, setEdit] = useState(false);

	const [images, setImages] = useState([]);

	const [err, setErr] = useState("");

	const [addedImages, setAddedImages] = useState([]);
	const [deletedImages, setDeletedImages] = useState([]);

	const [imagesChanged, setImagesChanged] = useState(false);

	const [loading, setLoading] = useState(true);

	const {
		status,
		error,
		data: photoGalleryData,
	} = useQuery(["photo_gallery"], GetImages);
	useEffect(() => {
		if (photoGalleryData && !imagesChanged) {
			if (photoGalleryData.length === 0) {
				setErr("No images found");
			}
			setImages(photoGalleryData);
			setLoading(false);
		}
		if (error) {
			setErr("Something went wrong");
			setLoading(false);
		}
	}, [photoGalleryData, status, error, imagesChanged]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = {};
		if (images.length > 16) {
			alert("You can only add 16 images");
			return;
		}
		if (!imagesChanged) {
			alert("No changes made");
			return;
		}
		if (addedImages.length > 0) {
			data.images_added = addedImages;
		}
		if (deletedImages.length > 0) {
			data.images_removed = deletedImages;
		}
		setLoading(true);
		const response = EditImages(data);
		response.then((res) => {
			if (res.status === 200) {
				if (res.data.length === 0) {
					setErr("No images found");
				}
				setImages(res.data);
				setImagesChanged(false);
				setEdit(false);
				setAddedImages([]);
				setDeletedImages([]);
				window.location.reload();
			} else {
				alert("Something went wrong");
			}
			setLoading(false);
		});
	};

	const handleCancel = () => {
		setImages(photoGalleryData);
		setAddedImages([]);
		setDeletedImages([]);
		setImagesChanged(false);
		setEdit(false);
	};

	// Image Handler
	const convertImageToBase64 = (image, id) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = () => resolve({ id, image_url: reader.result });
			reader.onerror = (error) => reject(error);
		});
	};

	const handleImageUpload = async (e) => {
		const files = e.target.files;

		const base64Images = await Promise.all(
			Object.values(files).map((file, id) => {
				return convertImageToBase64(file, images.length + id);
			}),
		);
		const reqImages = [];
		for (let i = 0; i < base64Images.length; i++) {
			reqImages.push(base64Images[i].image_url);
		}
		setImages([...images, ...base64Images]);
		setAddedImages([...addedImages, ...reqImages]);
		setImagesChanged(true);
		setErr("");
	};

	const handleImageDelete = (index) => {
		const newImages = images.filter((image) => image.id !== index);
		setImages(newImages);
		setDeletedImages([...deletedImages, index]);
		setImagesChanged(true);
	};

	return (
		<div className='container'>
			<form
				className='edit-container edit-container-large'
				onSubmit={(e) => handleSubmit(e)}>
				<div className='edit-item'>
					<h2>Gallery</h2>
					{!edit && (
						<button className='button' onClick={() => setEdit(true)}>
							Edit
						</button>
					)}
					{edit && (
						<>
							<button className='save-button' type='submit'>
								Save
							</button>
							<button
								className='button'
								type='button'
								onClick={() => handleCancel()}>
								Cancel
							</button>
						</>
					)}
				</div>
				<div className='gallery-container photo-gallery'>
					<div className='gallery-box '>
						<div className='gallery-header'>
							<div className='gallery-text'>
								<p>Add up to 16 images</p>
							</div>
							{edit && (
								<div>
									<label htmlFor='images-upload'>
										<AiOutlinePlus className='add-button' />
									</label>
									<input
										type='file'
										multiple
										onChange={(e) => handleImageUpload(e)}
										id='images-upload'
										name='images-upload'
										className='upload-image'
									/>
								</div>
							)}
						</div>
						<div className='gallery'>
							{loading && (
								<div className='container-buffer'>
									<div className='buffer-loader home'></div>
								</div>
							)}
							{!err &&
								images.map((image) => {
									return (
										<div key={image.id}>
											<img
												className='gallery-images'
												src={image.image_url}
												alt='Gallery Image'
											/>
											{edit && !loading && (
												<RiDeleteBin2Fill
													className='delete-icon'
													onClick={() => handleImageDelete(image.id)}
												/>
											)}
										</div>
									);
								})}
							{err && <p>{err}</p>}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default PhotoGallery;
