"use client";

import { Button, cn } from "@nextui-org/react";
import PropTypes from "prop-types";

export default function AddToCartButton({ children, data, className, size = "medium", variant = "solid", color = "primary", ...props }) {
	const handleAddToCart = () => {
		console.log(data);
		if (data && data.prod_id) {
			const storedItems = localStorage.getItem("cart");
			const items = storedItems ? JSON.parse(storedItems) : [];
			const existingItemIndex = items.findIndex((item) => item.id === data.prod_id);
			if (existingItemIndex !== -1) {
				items[existingItemIndex].quantity += 1;
			} else {
				items.push({
					id: "prod_" + data.prod_id,
					name: data.name,
					price: data.price,
					quantity: 1,
				});
			}
			localStorage.setItem("cart", JSON.stringify(items));
			console.log("Product added to cart:", data.prod_id);
		} else if (data && data.des_prod_id) {
			const storedItems = localStorage.getItem("cart");
			const items = storedItems ? JSON.parse(storedItems) : [];
			const existingItemIndex = items.findIndex((item) => item.id === data.des_prod_id);
			if (existingItemIndex !== -1) {
				items[existingItemIndex].quantity += 1;
			} else {
				items.push({
					id: "des_" + data.des_prod_id,
					name: data.name,
					price: data.price,
					quantity: 1,
				});
			}
			localStorage.setItem("cart", JSON.stringify(items));
			console.log("Designed Product added to cart:", data.des_prod_id);
		} else {
			console.error("Invalid data or data.des_prod_id is missing");
		}
	};

	return (
		<Button
			className={cn(className)}
			size={size}
			variant={variant}
			color={color}
			onClick={handleAddToCart}
			{...props}
		>
			{children}
		</Button>
	);
}

AddToCartButton.propTypes = {
	children: PropTypes.node.isRequired,
	data: PropTypes.shape({
		prod: PropTypes.shape({
			id: PropTypes.string.isRequired,
			attributes: PropTypes.shape({
				name: PropTypes.string.isRequired,
				regular_price: PropTypes.number.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
	className: PropTypes.string,
	size: PropTypes.oneOf(["small", "medium", "large"]),
	variant: PropTypes.oneOf(["solid", "outlined", "ghost"]),
	color: PropTypes.oneOf(["primary", "secondary", "success", "warning", "error"]),
};

AddToCartButton.defaultProps = {
	className: "",
	size: "medium",
	variant: "solid",
	color: "primary",
};
