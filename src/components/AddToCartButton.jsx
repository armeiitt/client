// "use client";
// import React from "react";
// import { Button, cn } from "@nextui-org/react";

// export default function AddToCartButton({ children, data, ...props }) {
//   const handleAddToCart = () => {
//     if (data && data.prod.id) {
//       // Lấy mảng đã lưu từ localStorage
//       const storedItems = localStorage.getItem("cart");
//       // Nếu mảng đã lưu tồn tại, chuyển đổi thành mảng JavaScript
//       const items = storedItems ? JSON.parse(storedItems) : [];

//       // Kiểm tra nếu sản phẩm đã tồn tại trong mảng localStorage
//       const existingItemIndex = items.findIndex((item) => item.id === data.id);
//       if (existingItemIndex !== -1) {
//         // Nếu đã tồn tại, tăng giá trị quantity lên 1
//         items[existingItemIndex].quantity += 1;
//       } else {
//         // Nếu chưa tồn tại, thêm sản phẩm vào mảng với quantity ban đầu là 1
//         items.push({
//           id: data.id,
//           name: data.attributes.name,
//           price: data.attributes.regular_price,
//           quantity: 1,
//         });
//       }

//       // Lưu mảng đã được cập nhật vào localStorage
//       localStorage.setItem("cart", JSON.stringify(items));
//       console.log("Item added to cart:", data.id);
//     } else {
//       console.error("Invalid data or data.id is missing");
//     }
//   };

//   return (
//     <Button
//       className={cn(props.className)}
//       size={props.size}
//       variant={props.variant}
//       color={props.color}
//       onClick={handleAddToCart}
//     >
//       {children}
//     </Button>
//   );
// }
"use client";
import environtment from "@/app/environtment/environtment";
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
			console.log("Item added to cart:", data.prod_id);
		} else if (data) {
			let desProd = {
				cus_id: 1,
				category_id: 1,
				size_id: 1,
				shape_id: 1,
				flavour_id: 1,
				name: "thinh",
				price: data,
			}
			postDesProd(desProd);
			getDesProd();
			// items.push({
			// 	id: "des_" + data.des_prod_id,
			// 	name: data.name,
			// 	price: data.price,
			// 	quantity: 1,
			// });
		} else {
			console.error("Invalid data or data.prod.id is missing");
		}
	};

	const postDesProd = async (desProd) => {
		try {
			let api_url = `http://${environtment.API_DOMAIN}:${environtment.API_PORT}/api/des_products`;
			let rest_api = {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(desProd)
			};

			const res = await fetch(api_url, rest_api);
			console.log(res);
		} catch (error) {
			console.log(error);
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
