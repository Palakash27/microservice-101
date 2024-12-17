import React, { useCallback, useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import Spinner from "../../components/Spinner/Spinner";
import PageWrapper from "../PageWrapper";
import { Product as ProductType } from "../../components/interfaces";
import { getProductsData } from "../ApiHelper";

const DATA_STATES = {
    waiting: "WAITING",
    loaded: "LOADED",
    error: "ERROR",
};

const ProductsPage: React.FC = () => {
    const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
    const [products, setProducts] = useState<ProductType[]>([]);

    const fetchProducts = useCallback(async () => {
        setLoadingState(DATA_STATES.waiting);
        const { products, errorOccured } = await getProductsData();
        setProducts(products);
        setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    let content;
    if (loadingState === DATA_STATES.waiting) {
        content = (
            <div
                className="flex flex-row justify-center w-full pt-4"
                data-testid="loading-spinner-container"
            >
                <Spinner />
            </div>
        );
    } else if (loadingState === DATA_STATES.loaded) {
        content = (
            <div
                className="flex flex-row justify-center w-full pt-4"
                data-testid="products-container"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <Product
                            key={product.ProductID}
                            id={product.ProductID}
                            name={product.ProductName}
                            imageUrl={product.ProductPhotoURL}
                        />
                    ))}
                </div>
            </div>
        );
    } else {
        content = (
            <div
                className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
                data-testid="error-container"
            >
                An error occurred fetching the data!
            </div>
        );
    }

    return <PageWrapper>{content}</PageWrapper>;
};

export default ProductsPage;
