import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import { PRODUCTS_URL } from "../ApiHelper";

export default {
    title: "Products Page",
    component: ProductsPage,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
    mockData: [
        {
            url: PRODUCTS_URL,
            method: "GET",
            status: 200,
            response: {
                data: [
                    {
                        ProductID: 1,
                        ProductName: "Hat",
                        ProductPhotoURL:
                            "https://plus.unsplash.com/premium_photo-1675989087109-f8a00bfea7d1?q=100&w=260",
                        ProductStatus: "Active",
                    },
                    {
                        ProductID: 2,
                        ProductName: "Shoes",
                        ProductPhotoURL:
                            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=100&w=260",
                        ProductStatus: "Active",
                    },
                    {
                        ProductID: 3,
                        ProductName: "Pants",
                        ProductPhotoURL:
                            "https://plus.unsplash.com/premium_photo-1674828601362-afb73c907ebe?q=100&w=260",
                        ProductStatus: "Active",
                    },
                ],
                message: "",
            },
        },
    ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
    mockData: [
        {
            url: PRODUCTS_URL,
            method: "GET",
            status: 200,
            response: {
                data: [],
                message: "",
            },
        },
    ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
    mockData: [
        {
            url: PRODUCTS_URL,
            method: "GET",
            status: 500,
            response: {
                data: [],
                message: "Error",
            },
        },
    ],
};
