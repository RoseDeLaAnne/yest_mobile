import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getProduct } from "../api/api";
import { RED, WHITE } from "../assets/colors";
import { fonts } from "../constants/styles";
import DataStore from "../stores/DataStore";

const itemsDefault = [
  {
    name: "Все",
    type: "all",
  },
  {
    name: "По названию",
    type: "name",
  },
  {
    name: "По рейтингу",
    type: "rating",
  },
  {
    name: "По стоимости",
    type: "price",
  },
];

const HorizontalTabMenu: React.FC<{
  style?: object;
  onChange: (value: string) => void;
  defaultValue?: string;
  items: { name: string; type: string }[];
}> = ({ style, onChange, defaultValue, items = itemsDefault }) => {
  const [selected, setSelected] = useState(defaultValue);
  const [categories, setCategories] = useState([]);
  const { getAllCategories, getListProducts, getHuy } = DataStore;

  const onChangeLocal = (value: { name: string; type: string }) => {
    onChange && onChange(value.type);
    setSelected(value.type);
  };
  useEffect(() => {
    console.log(
      "getAllCategories",
      getAllCategories().then((res) => console.log("res", res.data))
    );
    console.log("getListProducts", getHuy());

    getAllCategories().then((res) => setCategories(res.data));
  }, []);
  const changeCategory = (id: string | null) => {
    getHuy().then((res) => {
      getListProducts(res.uuid, id);
    });
    setSelected(id);
  };

  return (
    <ScrollView
      style={style}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={[
          styles.button,
          !selected ? { backgroundColor: RED } : { backgroundColor: WHITE },
        ]}
        onPress={() => changeCategory(null)}
      >
        <Text style={fonts.font12bold}>Все</Text>
      </TouchableOpacity>
      {categories.map((item, index) => (
        <TouchableOpacity
          style={[
            styles.button,
            selected === item?.uuid
              ? { backgroundColor: RED }
              : { backgroundColor: WHITE },
          ]}
          onPress={() => changeCategory(item?.uuid)}
          key={index}
        >
          <Text style={fonts.font12bold}>{item?.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 28,
    borderRadius: 28,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: WHITE,
    marginRight: 8,
  },
});

export default HorizontalTabMenu;
