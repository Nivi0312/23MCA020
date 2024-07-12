// src/ProductList.js
import React, { useState, useEffect } from 'react';
import { List, Card, Select, Pagination, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

const ProductList = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([...products]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
        if (products.length > 0) {
            setFilteredProducts(products)
        }
    }, [])


    const categories = [...new Set(products.map(p => p.category))];
    const companies = [...new Set(products.map(p => p.company))];

    function getProducts() {
        axios.get('http://localhost:3000/test/product/products').
            then(res => {
                setProducts(res.data.products)
            })
    }

    const handleFilterChange = () => {
        let filtered = products;

        if (selectedCategory) {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        if (selectedCompany) {
            filtered = filtered.filter(p => p.company === selectedCompany);
        }

        if (sortOrder) {
            filtered = filtered.sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : b.price - a.price));
        }
        setFilteredProducts(filtered);
    };

    const handleCategoryChange = value => {
        setSelectedCategory(value);
        handleFilterChange();
    };

    const handleCompanyChange = value => {
        setSelectedCompany(value);
        handleFilterChange();
    };

    const handleSortChange = value => {
        setSortOrder(value);
        handleFilterChange();
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Select Category"
                    style={{ width: 200, marginRight: 16 }}
                    onChange={handleCategoryChange}
                    allowClear
                >
                    {categories.map(category => (
                        <Option key={category} value={category}>
                            {category}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Select Company"
                    style={{ width: 200, marginRight: 16 }}
                    onChange={handleCompanyChange}
                    allowClear
                >
                    {companies.map(company => (
                        <Option key={company} value={company}>
                            {company}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Sort by Price"
                    style={{ width: 200, marginRight: 16 }}
                    onChange={handleSortChange}
                    allowClear
                >
                    <Option value="asc">Low to High</Option>
                    <Option value="desc">High to Low</Option>
                </Select>
            </div>
            <List
                grid={{ gutter: 16, column: 4 }}
                dataSource={paginatedProducts ?? products}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.productName}>
                            <p>{item.rating}</p>
                            <p>Price: ${item.price}</p>
                            <p>discount: ${item.discount}%</p>
                            <Button onClick={() => navigate(`/product/${item.productName}`, { state: { item: item } })}>View Product</Button>
                            {/* <Link to={`/product/${item.productName}`}>View Product</Link> */}
                        </Card>
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredProducts.length}
                onChange={handlePageChange}
                showSizeChanger
                onShowSizeChange={handlePageChange}
                style={{ marginTop: 16, textAlign: 'center' }}
            />
        </div>
    );
};

export default ProductList;
