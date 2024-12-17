import React from "react";
import { render, screen } from "@testing-library/react";
import Product from "../../components/Product/Product";

describe("Product component", () => {
    it("should display product name and image", () => {
        const productProps = {
            id: 1,
            name: "Product 1",
            imageUrl: "http://example.com/product1.jpg",
        };

        render(<Product {...productProps} />);

        expect(screen.getByText("Product 1")).toBeInTheDocument();

        const imgElement = screen.getByAltText("Product 1");
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute(
            "src",
            "http://example.com/product1.jpg"
        );

        expect(screen.getByText("ID: 1")).toBeInTheDocument();
    });
});
