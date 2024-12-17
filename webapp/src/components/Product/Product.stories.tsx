import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Product from "./Product";

export default {
    title: "Product",
    component: Product,
} as ComponentMeta<typeof Product>;

const Template: ComponentStory<typeof Product> = (args) => (
    <Product {...args} />
);

export const Default = Template.bind({});
Default.args = {
    id: 1,
    name: "Hat",
    imageUrl:
        "https://plus.unsplash.com/premium_photo-1675989087109-f8a00bfea7d1?q=100&w=260",
};

export const WithLongName = Template.bind({});
WithLongName.args = {
    id: 2,
    name: "This is a very long product name to test how the component handles long text",
    imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=100&w=260",
};

export const WithoutImage = Template.bind({});
WithoutImage.args = {
    id: 3,
    name: "Pants",
    imageUrl: "",
};
