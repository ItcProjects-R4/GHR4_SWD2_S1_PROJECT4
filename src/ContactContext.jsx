import React, { createContext, useState } from 'react';

//  إنشاء Context
export const ContactContext = createContext();

//  إنشاء  Provider Component
export default function ContactContextProvider({ children }) {
  // تجميع كل  States الخاصة بالفورم وال Toast والأنيميشن هنا
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // دالة تحديث المدخلات (تشتغل مع كل Input)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // دالة إرسال الفورم والتحكم في توقيت الأنيميشن ال Toast
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // تشغيل ال Toast وبدء أنيميشن اختفاء الفورم وحركة الزجاجة فوراً
    setShowToast(true); 
    setIsSent(true); 

    // إخفاء ال Toast تلقائياً بعد 3 ثوانٍ من ظهوره
    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    // إعادة تعيين الحقول والفورم لحالتها الأصلية بعد انتهاء حركة الزجاجة (3 ثوانٍ)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSent(false);
    }, 3000); 
  };

  //  تمرير البيانات والدوال عبر ال Provider لكل المكونات الأبناء
  return (
    <ContactContext.Provider value={{ 
      formData, 
      isSent, 
      showToast, 
      handleChange, 
      handleSubmit 
    }}>
      {children}
    </ContactContext.Provider>
  );
}