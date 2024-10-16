import { CheckoutProvider } from "@/context/CheckoutContext";
import CustomLayout from "./dashboard/CustomLayout";
import "./globals.css";
import ChatButton from "@/components/Dashboard/ChatButton";


export const metadata = {
  title: "BASEM",
  description: "Buy And Selam Easy Market",
  icons: {
    icon: "/basem_logo.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CheckoutProvider>
          <CustomLayout> 
            {children}
            <ChatButton />
          </CustomLayout>
        </CheckoutProvider>
      </body >
    </html >
  );
}
