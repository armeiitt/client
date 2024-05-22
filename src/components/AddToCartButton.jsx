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
import React from "react";
import PropTypes from "prop-types";
import { Button, cn } from "@nextui-org/react";

export default function AddToCartButton({ children, data, className, size = "medium", variant = "solid", color = "primary", ...props }) {
  const handleAddToCart = () => {
    console.log(data);
    if (data) {
      const storedItems = localStorage.getItem("cart");
      const items = storedItems ? JSON.parse(storedItems) : [];
      const existingItemIndex = items.findIndex((item) => item.id === data.prod_id);
      if (existingItemIndex !== -1) {
        items[existingItemIndex].quantity += 1;
      } else {
        items.push({
          id: data.prod_id,
          name: data.name,
          price: data.price,
          quantity: 1,
        });
      }
      localStorage.setItem("cart", JSON.stringify(items));
      console.log("Item added to cart:", data.prod_id);
    } else {
      console.error("Invalid data or data.prod.id is missing");
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
