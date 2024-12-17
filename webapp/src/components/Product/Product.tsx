import React from "react";
import { truncateName } from "../../utils";

interface ProductProps {
    id: number;
    name: string;
    imageUrl: string;
}

const Product: React.FC<ProductProps> = ({ id, name, imageUrl }) => {
    return (
        <div className="border p-4 rounded shadow-sm bg-white w-80">
            <div className="relative">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-48 object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-2 rounded-b">
                    <h3 className="text-lg font-semibold">
                        {truncateName(name)}
                    </h3>
                </div>
            </div>
            <div className="mt-2">
                <p className="text-gray-600">ID: {id}</p>
            </div>
        </div>
    );
};

export default Product;
