"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Star, ChevronRight, MessageCircle, ShoppingCart, Loader2 } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, getDoc } from 'firebase/firestore'
import { firestore } from '@/firebase/config'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'




export default function SupplierPage() {
    const router = useRouter()
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false); // New loading state for products
    const [fournisseurs, loading, error] = useCollection(
        collection(firestore, 'fournisseur'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    useEffect(() => {
        const fetchProducts = async () => {
            if (fournisseurs) {
                setIsLoadingProducts(true); // Set loading state to true when fetching starts
                const fetchedProducts = [];

                for (const fournisseurDoc of fournisseurs.docs) {
                    const fournisseurData = fournisseurDoc.data();
                    const productIds = fournisseurData.product || [];

                    for (const productId of productIds) {
                        const productRef = doc(firestore, 'product', productId);
                        const productDoc = await getDoc(productRef);
                        if (productDoc.exists()) {
                            fetchedProducts.push({
                                id: productId,
                                ...productDoc.data(),
                            });
                        } else {
                            console.error(`Product with ID ${productId} not found.`);
                        }
                    }
                }

                setProducts(fetchedProducts);
                setIsLoadingProducts(false); // Set loading state to false when fetching is done
            }
        };

        if (!loading && fournisseurs) {
            fetchProducts();
        }
    }, [fournisseurs, loading]);


    const GoToProduct = (name) => {
        router.push(`./dashboard/product/${name}`)
    }

    return (
        <div className="min-h-screen bg-gray-100">


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {fournisseurs?.docs.slice(0, 3).map((supplier) => (
                        <Card key={supplier.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/4 p-6 flex flex-col items-center justify-center bg-gray-50">
                                    <Image
                                        src={supplier.data().logoURL}
                                        alt={supplier.data().name}
                                        width={150}
                                        height={150}
                                        className="rounded-full"
                                    />
                                    <h2 className="mt-4 text-xl font-semibold text-center">{supplier.data().name}</h2>
                                    <div className="flex items-center mt-2">
                                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                        <span className="ml-1 text-sm text-gray-600">4</span>
                                    </div>
                                    <Button className="mt-4">Contact Supplier</Button>
                                </div>
                                <CardContent className="md:w-3/4 p-6">
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        <Badge variant="secondary">
                                            5 YRS
                                        </Badge>
                                        <Badge variant="secondary">
                                            100% Response Rate
                                        </Badge>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">Main Products:</h3>
                                    <p className="text-gray-600 mb-4">T-shirt, electronic, shoes</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {isLoadingProducts ? (
                                            <div className="flex w-full justify-center">
                                                <Loader2 />
                                            </div>
                                        ) : (
                                            <>
                                                {products?.slice(0, 3).map((product, index) => (
                                                    <div
                                                        key={index}
                                                        className="border rounded-lg p-4 cursor-pointer"
                                                        onClick={() => GoToProduct(product.name)}
                                                    >
                                                        <Image
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            width={100}
                                                            height={100}
                                                            className="mx-auto mb-2"
                                                        />
                                                        <h4 className="text-sm font-medium text-center">{product.name}</h4>
                                                        <p className="text-sm text-center text-gray-600">{product.price} FCFA</p>
                                                    </div>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </div>
                            <CardFooter className="bg-gray-50 p-4 flex justify-between items-center">
                                <span className="text-sm text-gray-600">Minimum order: 100 pieces</span>
                                <Link href="/dashboard" className="text-blue-600 hover:underline flex items-center">
                                    View Supplier <ChevronRight className="ml-1 h-4 w-4" />
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </main>

        </div>
    )
}