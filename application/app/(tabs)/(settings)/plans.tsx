import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text } from '@/components/Common/Themed';
import { FontAwesome } from '@expo/vector-icons';

export default function Plans() {
  const plans = [
    {
      name: 'Free',
      price: '₹0 / month',
      perks: [
        'Access to core features',
        'Up to 3 thought boxes',
        'Basic insights',
        'Community support',
      ],
      color: '#8da9c4',
      icon: 'user-o',
    },
    {
      name: 'Pro',
      price: '₹299 / month',
      perks: [
        'Unlimited thought boxes',
        'AI-powered recommendations',
        'Advanced analytics & insights',
        'Priority support',
        'Early access to new features',
      ],
      color: '#134074',
      icon: 'star',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Choose Your Plan</Text>

        {plans.map((plan) => (
          <View key={plan.name} style={styles.planCard}>
            <View style={styles.header}>
              <FontAwesome name={plan.icon as any} size={28} />
              <Text style={styles.planName}>{plan.name}</Text>
            </View>

            <Text style={styles.price}>{plan.price}</Text>

            <View style={styles.perkList}>
              {plan.perks.map((perk, idx) => (
                <View key={idx} style={styles.perkItem}>
                  <FontAwesome name="check" size={14}/>
                  <Text style={styles.perkText}>{perk}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {plan.name === 'Free' ? 'Current Plan' : 'Upgrade to Pro'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingBottom: 48
  },
  container: {
    paddingVertical: 32,
    paddingHorizontal: 18,
    alignItems: 'center',
    gap: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // color: '#134074',
    marginBottom: 12,
  },
  planCard: {
    backgroundColor: 'white',
    width: '100%',
    borderWidth: 2,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  planName: {
    fontSize: 24,
    fontWeight: '600',
  },
  price: {
    fontSize: 18,
    color: '#4b5563',
    marginBottom: 16,
  },
  perkList: {
    width: '100%',
    gap: 8,
    marginBottom: 20,
  },
  perkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  perkText: {
    fontSize: 16,
    // color: '#1f2937',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    // borderColor: 'black'
  },
  buttonText: {
    // color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});