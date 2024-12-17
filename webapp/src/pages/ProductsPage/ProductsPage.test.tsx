import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { PRODUCTS_URL } from "../ApiHelper";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./ProductsPage";

describe("ProductsPage", () => {
    it("should display loading dpinner", () => {
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );
        expect(
            screen.getByTestId(`loading-spinner-container`)
        ).toBeInTheDocument();
    });
    it("should display products container", async () => {
        const response = {
            data: [
                {
                    ProductID: 1,
                    ProductName: "Product 1",
                    ProductPhotoURL: "http://example.com/product1.jpg",
                },
                {
                    ProductID: 2,
                    ProductName: "Product 2",
                    ProductPhotoURL: "http://example.com/product2.jpg",
                },
            ],
            message: "",
        };
        const server = setupServer(
            rest.get(PRODUCTS_URL, (req, res, ctx) => {
                return res(ctx.status(200), ctx.json(response));
            })
        );

        server.listen();
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(
                screen.getByTestId(`products-container`)
            ).toBeInTheDocument();
        });
        server.close();
    });
    it("should display error message", async () => {
        const response = {
            data: [],
            message: "Error",
        };
        const server = setupServer(
            rest.get(PRODUCTS_URL, (req, res, ctx) => {
                return res(ctx.status(500), ctx.json(response));
            })
        );
        server.listen();
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
        });
        server.close();
    });
});
