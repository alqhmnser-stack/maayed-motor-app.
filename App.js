import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput, SafeAreaView, StatusBar, FlatList } from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const COLORS = {
  primary: '#E50914',
  background: '#0D0D0D',
  cardBg: '#1A1A1A',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  accent: '#10B981',
  blue: '#3B82F6',
  border: '#2A2A2A'
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home': return <HomeScreen navigate={setCurrentScreen} />;
      case 'Showroom': return <ShowroomScreen navigate={setCurrentScreen} />;
      case 'Maintenance': return <MaintenanceAssistantScreen />;
      case 'PaymentMethods': return <PaymentMethodsScreen />;
      case 'Contact': return <ContactScreen />;
      case 'AdminPanel': return <AdminPanelScreen />;
      case 'ProductDetails': return <ProductDetailsScreen navigate={setCurrentScreen} />;
      case 'Account': return <AccountScreen navigate={setCurrentScreen} />;
      default: return <HomeScreen navigate={setCurrentScreen} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={{ flex: 1 }}>{renderScreen()}</View>
      <View style={styles.bottomTab}>
        <TabButton icon="home-outline" activeIcon="home" label="الرئيسية" active={currentScreen === 'Home'} onPress={() => setCurrentScreen('Home')} />
        <TabButton icon="storefront-outline" activeIcon="storefront" label="المعرض" active={currentScreen === 'Showroom'} onPress={() => setCurrentScreen('Showroom')} />
        <TabButton icon="construct-outline" activeIcon="construct" label="الصيانة" active={currentScreen === 'Maintenance'} onPress={() => setCurrentScreen('Maintenance')} />
        <TabButton icon="chatbubbles-outline" activeIcon="chatbubbles" label="المحادثات" active={currentScreen === 'Contact'} onPress={() => setCurrentScreen('Contact')} />
        <TabButton icon="person-outline" activeIcon="person" label="حسابي" active={currentScreen === 'Account'} onPress={() => setCurrentScreen('Account')} />
      </View>
    </SafeAreaView>
  );
}

const TabButton = ({ icon, activeIcon, label, active, onPress }) => (
  <TouchableOpacity style={styles.tabItem} onPress={onPress}>
    <Ionicons name={active ? activeIcon : icon} size={22} color={active ? COLORS.primary : COLORS.textSecondary} />
    <Text style={[styles.tabLabel, { color: active ? COLORS.primary : COLORS.textSecondary }]}>{label}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigate }) => (
  <ScrollView style={styles.screenContainer}>
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <MaterialCommunityIcons name="motorbike" size={28} color={COLORS.primary} />
        <View style={{ marginLeft: 8 }}>
          <Text style={styles.brandTitle}>معيض موتور</Text>
          <Text style={styles.brandSubtitle}>Maayed Motor</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigate('AdminPanel')}>
        <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </View>

    <View style={styles.bannerCard}>
      <Text style={styles.bannerTitle}>دراجتك .. بأمان وراحة</Text>
      <TouchableOpacity style={styles.bannerBtn} onPress={() => navigate('Showroom')}>
        <Text style={styles.bannerBtnText}>تصفح المعرض</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.gridContainer}>
      <GridCard title="المعرض (بيع وشراء)" icon="storefront" color={COLORS.accent} onPress={() => navigate('Showroom')} />
      <GridCard title="مساعد الصيانة الذكي" icon="construct" color={COLORS.blue} onPress={() => navigate('Maintenance')} />
      <GridCard title="طرق الدفع" icon="wallet" color="#8B5CF6" onPress={() => navigate('PaymentMethods')} />
      <GridCard title="التواصل" icon="call" color="#F59E0B" onPress={() => navigate('Contact')} />
    </View>
  </ScrollView>
);

const GridCard = ({ title, icon, color, onPress }) => (
  <TouchableOpacity style={[styles.gridCard, { backgroundColor: color }]} onPress={onPress}>
    <Ionicons name={icon} size={32} color={COLORS.text} />
    <Text style={styles.gridCardText}>{title}</Text>
  </TouchableOpacity>
);

const ShowroomScreen = ({ navigate }) => {
  const products = [
    { id: '1', title: 'دراجة هوندا 150cc', price: '1,250,000 ر.ي', location: 'صنعاء', status: 'ممتاز' },
    { id: '2', title: 'قطع غيار أصلي - فرامل', price: '250,000 ر.ي', location: 'تعز', status: 'جديد' },
    { id: '3', title: 'دراجة باجاج 125cc', price: '980,000 ر.ي', location: 'الحديدة', status: 'مستعمل نظيف' },
  ];

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.screenHeader}>المعرض</Text>
      <TextInput style={styles.searchInput} placeholder="إبحث عن إعلان..." placeholderTextColor={COLORS.textSecondary} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => navigate('ProductDetails')}>
            <View style={styles.productImgPlaceholder}>
              <MaterialCommunityIcons name="motorbike" size={40} color={COLORS.textSecondary} />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              <Text style={styles.productSub}>{item.location} • {item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const MaintenanceAssistantScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenHeader}>مساعد الصيانة الذكي 🤖</Text>
    <View style={styles.chatBox}>
      <Text style={styles.chatMessage}>مرحباً بك في مساعد الصيانة الذكي! أخبرني بمشكلتك وسأساعدك بأفضل ما أستطيع.</Text>
    </View>
    <View style={styles.optionsRow}>
      {['الزيت', 'الكهرباء', 'المحرك', 'الفرامل', 'الإطارات', 'حرارة'].map((opt, i) => (
        <TouchableOpacity key={i} style={styles.chipOption}>
          <Text style={styles.chipText}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

const PaymentMethodsScreen = () => (
  <ScrollView style={styles.screenContainer}>
    <Text style={styles.screenHeader}>طرق الدفع المتاحة</Text>
    <PaymentItem name="محفظة موبايلي" detail="+967 770 123 456" />
    <PaymentItem name="محفظة يمن موبايل" detail="+967 771 987 654" />
    <PaymentItem name="بنك اليمن الدولي" detail="رقم الحساب: 123456789" />
    <PaymentItem name="خدمة كاش" detail="حساب معتمد" />
  </ScrollView>
);

const PaymentItem = ({ name, detail }) => (
  <View style={styles.paymentCard}>
    <Ionicons name="card-outline" size={26} color={COLORS.primary} />
    <View style={{ marginLeft: 12 }}>
      <Text style={{ color: COLORS.text, fontWeight: 'bold' }}>{name}</Text>
      <Text style={{ color: COLORS.textSecondary }}>{detail}</Text>
    </View>
  </View>
);

const AdminPanelScreen = () => (
  <ScrollView style={styles.screenContainer}>
    <Text style={styles.screenHeader}>لوحة تحكم المالك 👑</Text>
    <View style={styles.statsContainer}>
      <StatBox title="الإعلانات" count="342" />
      <StatBox title="المستخدمون" count="156" />
      <StatBox title="البلاغات" count="12" />
    </View>
  </ScrollView>
);

const StatBox = ({ title, count }) => (
  <View style={styles.statCard}>
    <Text style={{ color: COLORS.textSecondary }}>{title}</Text>
    <Text style={{ color: COLORS.primary, fontSize: 22, fontWeight: 'bold' }}>{count}</Text>
  </View>
);

const ProductDetailsScreen = ({ navigate }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenHeader}>تفاصيل الإعلان</Text>
    <Text style={styles.productTitle}>دراجة هوندا 150cc</Text>
    <Text style={styles.productPrice}>1,250,000 ر.ي</Text>
    <View style={{ flexDirection: 'row', marginTop: 20 }}>
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.primary }]}>
        <Text style={styles.btnText}>اتصال</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, { backgroundColor: COLORS.accent }]}>
        <Text style={styles.btnText}>واتساب</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ContactScreen = () => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenHeader}>تواصل معنا</Text>
    <Text style={{ color: COLORS.text }}>معيض موتور - صنعاء - اليمن</Text>
    <Text style={{ color: COLORS.textSecondary, marginTop: 8 }}>هاتف: +967 771 335 364</Text>
  </View>
);

const AccountScreen = ({ navigate }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenHeader}>حسابي</Text>
    <Text style={{ color: COLORS.text, fontSize: 18 }}>معيض محمد</Text>
    <Text style={{ color: COLORS.textSecondary }}>example@gmail.com</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  screenContainer: { flex: 1, padding: 16, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  brandTitle: { color: COLORS.text, fontSize: 18, fontWeight: 'bold' },
  brandSubtitle: { color: COLORS.primary, fontSize: 12 },
  screenHeader: { color: COLORS.text, fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  bottomTab: { flexDirection: 'row', backgroundColor: COLORS.cardBg, paddingVertical: 10, borderTopWidth: 1, borderColor: COLORS.border, justifyContent: 'space-around' },
  tabItem: { alignItems: 'center' },
  tabLabel: { fontSize: 10, marginTop: 4 },
  bannerCard: { backgroundColor: COLORS.cardBg, padding: 20, borderRadius: 12, marginBottom: 20, borderRightWidth: 4, borderRightColor: COLORS.primary },
  bannerTitle: { color: COLORS.text, fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  bannerBtn: { backgroundColor: COLORS.primary, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, alignSelf: 'flex-start' },
  bannerBtnText: { color: COLORS.text, fontWeight: 'bold' },
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridCard: { width: '48%', height: 100, borderRadius: 12, padding: 12, justifyContent: 'space-between', marginBottom: 12 },
  gridCardText: { color: COLORS.text, fontWeight: 'bold', fontSize: 14 },
  searchInput: { backgroundColor: COLORS.cardBg, color: COLORS.text, padding: 12, borderRadius: 8, marginBottom: 16 },
  productCard: { flexDirection: 'row', backgroundColor: COLORS.cardBg, padding: 12, borderRadius: 8, marginBottom: 12, alignItems: 'center' },
  productImgPlaceholder: { width: 60, height: 60, backgroundColor: '#252525', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  productTitle: { color: COLORS.text, fontWeight: 'bold', fontSize: 16 },
  productPrice: { color: COLORS.primary, fontWeight: 'bold', marginVertical: 4 },
  productSub: { color: COLORS.textSecondary, fontSize: 12 },
  chatBox: { backgroundColor: COLORS.cardBg, padding: 16, borderRadius: 8, marginBottom: 16 },
  chatMessage: { color: COLORS.text },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipOption: { backgroundColor: COLORS.cardBg, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border },
  chipText: { color: COLORS.textSecondary },
  paymentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.cardBg, padding: 16, borderRadius: 8, marginBottom: 12 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: { flex: 1, backgroundColor: COLORS.cardBg, padding: 16, borderRadius: 8, marginHorizontal: 4, alignItems: 'center' },
  actionBtn: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
  btnText: { color: COLORS.text, fontWeight: 'bold' }
});
