interface ProductPageProps {
    params: {
      id: string;
    };
  }
  
  export default function ProductPage({ params }: ProductPageProps) {
    const { id } = params;
  
    return <div>Product ID: {id}</div>;
  }