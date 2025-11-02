import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';

interface CreatableSelectProps {
  options?: string[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  mode?: 'single' | 'multi';
  style?: Record<string, string | number>;
  maxSelections?: number;
}

const CreatableSelect: React.FC<CreatableSelectProps> = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select or create...',
  mode = 'single',
  maxSelections,
  style
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const isSingleMode = mode === 'single';
  const selectedValues = isSingleMode ? (value ? [value as string] : []) : (value as string[]);

  const filteredOptions = options.filter(opt =>
    opt && typeof opt === 'string' && opt.toLowerCase().includes(search.toLowerCase())
  );

  const showCreateOption = search.length > 0 && 
    search.length <= 10 && 
    !options.some(opt => opt && typeof opt === 'string' && opt.toLowerCase() === search.toLowerCase());

  const isSelected = (item: string): boolean => {
    return selectedValues.includes(item);
  };

  const handleSelect = (item: string): void => {
    if (isSingleMode) {
      onChange(item);
      setVisible(false);
      setSearch('');
    } else {
      const currentValues = value as string[];
      if (currentValues.includes(item)) {
        onChange(currentValues.filter(v => v !== item));
      } else {
        // Check if max limit is reached
        if (maxSelections && currentValues.length >= maxSelections) {
          return; // Don't add if limit reached
        }
        onChange([...currentValues, item]);
      }
      setSearch('');
    }
  };

  const handleCreate = (): void => {
    if (search.length > 0 && search.length <= 10) {
      if (isSingleMode) {
        onChange(search);
        setVisible(false);
      } else {
        const currentValues = value as string[];
        // Check if max limit is reached
        if (maxSelections && currentValues.length >= maxSelections) {
          return; // Don't add if limit reached
        }
        onChange([...currentValues, search]);
      }
      setSearch('');
    }
  };

  const handleClose = (): void => {
    setVisible(false);
    setSearch('');
  };

  // const handleRemoveTag = (item: string): void => {
  //   if (!isSingleMode) {
  //     const currentValues = value as string[];
  //     onChange(currentValues.filter(v => v !== item));
  //   }
  // };

  const displayValue = (): string => {
    if (isSingleMode) {
      return (value as string) || placeholder;
    }
    const vals = value as string[];
    return vals.length > 0 ? `${vals.length} selected` : placeholder;
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setVisible(true)}
      >
        <Text style={selectedValues.length > 0 ? styles.valueText : styles.placeholderText}>
          {displayValue()}
        </Text>
      </TouchableOpacity>

      {/*{!isSingleMode && selectedValues.length > 0 && (
        <View style={styles.tagsContainer}>
          {selectedValues.map((item: string, idx: number) => (
            <View key={`${item}-${idx}`} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
              <TouchableOpacity 
                onPress={() => handleRemoveTag(item)}
                style={styles.tagRemove}
              >
                <Text style={styles.tagRemoveText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}*/}

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View style={styles.modal} onStartShouldSetResponder={() => true}>
            <TextInput
              style={styles.input}
              value={search}
              onChangeText={(text: string) => setSearch(text.slice(0, 10))}
              placeholder="Type to search or create..."
              autoFocus
              maxLength={10}
            />
            <View style={styles.counterRow}>
              <Text style={styles.counter}>
                {search.length}/10
              </Text>
              {!isSingleMode && maxSelections && (
                <Text style={styles.counter}>
                  {selectedValues.length}/{maxSelections} selected
                </Text>
              )}
            </View>

            {/*{!isSingleMode && selectedValues.length > 0 && (
              <View style={styles.tagsContainer}>
                {selectedValues.map((item: string, idx: number) => (
                  <View key={`${item}-${idx}`} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                    <TouchableOpacity 
                      onPress={() => handleRemoveTag(item)}
                      style={styles.tagRemove}
                    >
                      <Text style={styles.tagRemoveText}>✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}*/}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item: string, idx: number) => `${item}-${idx}`}
              style={styles.list}
              renderItem={({ item }: { item: string }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    isSelected(item) && styles.selectedOption
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[
                    styles.optionText,
                    isSelected(item) && styles.selectedOptionText
                  ]}>
                    {item}
                  </Text>
                  {isSelected(item) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                showCreateOption ? (
                  <TouchableOpacity
                    style={[styles.option, styles.createOption]}
                    onPress={handleCreate}
                  >
                    <Text style={styles.createText}>
                      Create "{search}"
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.emptyText}>
                    {search ? 'No matches found' : 'Start typing...'}
                  </Text>
                )
              }
            />

            {/*<Text>*/}
              {!isSingleMode && (
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={handleClose}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
              )}
            {/*</Text>*/}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selector: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
  },
  valueText: {
    fontSize: 16,
    color: '#111827',
  },
  placeholderText: {
    fontSize: 16,
    color: '#9ca3af',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#2563eb',
  },
  tagRemove: {
    padding: 2,
  },
  tagRemoveText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 4,
  },
  counter: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  list: {
    maxHeight: 300,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  selectedOption: {
    backgroundColor: '#f0f9ff',
  },
  optionText: {
    fontSize: 16,
    color: '#111827',
  },
  selectedOptionText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  createOption: {
    backgroundColor: '#eff6ff',
  },
  createText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  emptyText: {
    padding: 20,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 14,
  },
  doneButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
    // width: '100%'
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreatableSelect;

// USAGE EXAMPLES:

// Single Select:
// const [selected, setSelected] = useState<string>('');
// <CreatableSelect
//   options={['Apple', 'Banana', 'Cherry']}
//   value={selected}
//   onChange={(val) => setSelected(val as string)}
//   mode="single"
//   placeholder="Select a fruit..."
// />

// Multi Select:
// const [selected, setSelected] = useState<string[]>([]);
// <CreatableSelect
//   options={['Apple', 'Banana', 'Cherry']}
//   value={selected}
//   onChange={(val) => setSelected(val as string[])}
//   mode="multi"
//   placeholder="Select fruits..."
// />
