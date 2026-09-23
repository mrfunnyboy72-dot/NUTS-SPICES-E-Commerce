import React from 'react';
import { useCart } from '../context/CartContext';
import { 
  Package, 
  Truck, 
  Receipt, 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldAlert, 
  UserCheck, 
  PhoneCall, 
  RefreshCw,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function ShippingPolicyPage() {
  const { navigate } = useCart();

  return (
    <div className="bg-[#FAF5EF] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#8C7A6B]">
          <button onClick={() => navigate('home')} className="hover:text-[#8B3A13] transition-colors cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="font-bold text-[#2B1509]">Shipping Policy</span>
        </nav>

        {/* HERO HEADER */}
        <div className="bg-[#2B1509] text-white p-8 sm:p-12 rounded-[28px] sm:rounded-[36px] shadow-xl border border-[#8B3A13]/40 relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 rounded-full bg-[#8B3A13]/20 blur-3xl pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D4AF37] text-[#2B1509] text-xs font-black tracking-widest uppercase rounded-full shadow-sm">
            <Truck className="w-3.5 h-3.5" />
            <span>Delivery Guidelines</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white tracking-tight">
            Shipping Policy
          </h1>

          <p className="text-sm sm:text-base font-serif italic text-[#E6D7C3] leading-relaxed max-w-2xl">
            At HAJI NUTS & SPICES, we carefully pack every order to make sure your nuts, dry fruits and spices reach you fresh and safely. This Shipping Policy explains how we process and deliver your orders. We always try our best to make your shopping experience simple, reliable and convenient.
          </p>
        </div>

        {/* POLICY CONTENT SECTIONS GRID */}
        <div className="space-y-8">
          
          {/* 1. ORDER PROCESSING */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <Package className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                1. Order Processing
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              Once your order is successfully placed, our team will review and process it. Orders are carefully checked, packed and prepared before dispatch.
            </p>

            <div className="p-4 bg-[#FAF5EF] rounded-xl border border-[#E6D7C3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#8B3A13] uppercase tracking-wider">Estimated Order Processing Time:</span>
              <span className="text-sm font-extrabold text-[#2B1509] bg-white px-3 py-1 rounded-lg border border-[#E6D7C3]">
                [ADD ORDER PROCESSING TIME]
              </span>
            </div>

            <p className="text-xs text-[#8C7A6B] italic">
              * Processing time may vary depending on product availability, order volume, holidays or special occasions.
            </p>
          </div>

          {/* 2. SHIPPING & DELIVERY TIME */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                2. Shipping & Delivery Time
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              After your order is dispatched, delivery will take approximately:
            </p>

            <div className="p-4 bg-[#FAF5EF] rounded-xl border border-[#E6D7C3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#8B3A13] uppercase tracking-wider">Estimated Delivery Time:</span>
              <span className="text-sm font-extrabold text-[#2B1509] bg-white px-3 py-1 rounded-lg border border-[#E6D7C3]">
                [ADD DELIVERY TIME]
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              Delivery time may vary depending on your delivery location, courier availability, weather conditions, holidays and other unavoidable circumstances. We request customers to provide a complete and accurate delivery address and contact number while placing the order.
            </p>
          </div>

          {/* 3. SHIPPING CHARGES */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <Receipt className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                3. Shipping Charges
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              Shipping charges, if applicable, will be shown or communicated before the order is confirmed.
            </p>

            <div className="p-4 bg-[#FAF5EF] rounded-xl border border-[#E6D7C3] space-y-2">
              <span className="text-xs font-bold text-[#8B3A13] uppercase tracking-wider block">Applicable Shipping Charge:</span>
              <div className="text-sm font-extrabold text-[#2B1509] bg-white p-3 rounded-lg border border-[#E6D7C3]">
                [ADD SHIPPING CHARGE / FREE SHIPPING INFORMATION]
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              If shipping charges vary based on order value, location or other conditions, applicable information is displayed clearly during checkout.
            </p>
          </div>

          {/* 4. DELIVERY ADDRESS */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <MapPin className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                4. Delivery Address
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              Customers are responsible for providing the correct delivery details. Please make sure the following information is correct before confirming your order:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              {['Full Name', 'Mobile Number', 'Complete Address', 'City', 'State', 'Pincode'].map((field, idx) => (
                <div key={idx} className="flex items-center gap-2 p-3 bg-[#FAF5EF] rounded-xl border border-[#E6D7C3]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B3A13] shrink-0" />
                  <span className="text-xs font-bold text-[#2B1509]">{field}</span>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              If incorrect or incomplete information is provided, delivery may be delayed or the order may not be successfully delivered. If you need to update your address after placing an order, contact us as soon as possible.
            </p>
          </div>

          {/* 5. ORDER TRACKING */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <Navigation className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                5. Order Tracking
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              Once the order is dispatched, tracking information may be provided when available. Customers can use the available tracking information to check the progress of their shipment. For any delivery-related questions, customers can contact our team directly on WhatsApp or Customer Support.
            </p>
          </div>

          {/* 6. DELAYED DELIVERY */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                6. Delayed Delivery
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              Sometimes delivery may take longer than the estimated time because of unavoidable circumstances such as:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Weather conditions & rain',
                'Public holidays & festivals',
                'Courier partner delays',
                'High seasonal order volumes',
                'Incorrect address or contact details',
                'Regional transportation issues',
                'Circumstances beyond our control'
              ].map((reason, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-[#4A3525]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A13] shrink-0" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              We appreciate your patience in such situations. If your order is significantly delayed, please contact us and our team will gladly help you check the status.
            </p>
          </div>

          {/* 7. DAMAGED PACKAGE */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                7. Damaged Package
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              We take utmost care while packing products before dispatch. If your package appears damaged or tampered with when you receive it, please contact us as soon as possible.
            </p>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              Where applicable, please provide clear photographs or unboxing videos of the package and products so our team can review the issue. Any replacement, return or refund will be handled according to our Returns & Refunds Policy.
            </p>
          </div>

          {/* 8. DELIVERY ATTEMPTS */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <UserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                8. Delivery Attempts
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              Please ensure that someone is available at the provided delivery address to receive the order. If a delivery attempt fails because the customer is unavailable, the address is incorrect or the courier cannot contact the customer, additional delivery attempts or re-dispatch arrangements may be required.
            </p>
          </div>

          {/* 9. CONTACT US */}
          <div className="bg-[#2B1509] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md border border-[#8B3A13] space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#8B3A13] text-white rounded-2xl">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  9. Contact Us
                </h2>
                <p className="text-xs text-[#C4A484]">Have questions regarding shipping or delivery? Contact HAJI NUTS & SPICES.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 bg-[#3B1F0E] rounded-xl border border-[#5C3317] space-y-1">
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">Phone Number</span>
                <span className="text-white font-semibold block">[ADD BUSINESS PHONE]</span>
              </div>

              <div className="p-4 bg-[#3B1F0E] rounded-xl border border-[#5C3317] space-y-1">
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">Email Address</span>
                <span className="text-white font-semibold block">[ADD BUSINESS EMAIL]</span>
              </div>

              <div className="p-4 bg-[#3B1F0E] rounded-xl border border-[#5C3317] space-y-1">
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">Store Address</span>
                <span className="text-white font-semibold block">[ADD BUSINESS ADDRESS]</span>
              </div>
            </div>
          </div>

          {/* 10. POLICY UPDATES */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#E6D7C3] shadow-sm space-y-4 hover:border-[#8B3A13]/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#FAF5EF] text-[#8B3A13] rounded-2xl border border-[#E6D7C3]">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#2B1509]">
                10. Policy Updates
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#4A3525] leading-relaxed">
              We may update this Shipping Policy from time to time to reflect changes in our services, delivery process or business operations. Any updated version will be published on this page.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
