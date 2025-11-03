import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedService, setSelectedService] = useState("Home Cleaning");
  // For Indoor Services we have subservices (Handyman, Plumbing, ...).
  const [selectedSubservice, setSelectedSubservice] = useState("Handyman");

  // keep selected category per service so choosing a category in one tab
  // doesn't affect the others. For Indoor Services we store a nested map.
  const [selectedCategoryMap, setSelectedCategoryMap] = useState<any>({
    "Home Cleaning": null,
    "AC Cleaning": null,
    "AC Deep Cleaning (Chemical Cleaning)": null,
    "Indoor Services": {
      Handyman: null,
      Plumbing: null,
      Electrical: null,
      "Appliance Repair": null,
      "Pest Control": null,
    },
  });

  // If the booking screen is opened with query params (from client home),
  // preselect the service / subservice accordingly, but only on initial mount
  useEffect(() => {
    if (params && params.service) {
      const svc = (params.service as string) || "";
      if (svc) setSelectedService(svc as string);
    }
    if (params && params.sub) {
      const sub = (params.sub as string) || "";
      if (sub) setSelectedSubservice(sub as string);
    }
  }, []); // Empty dependency array so it only runs once on mount

  // HOME CLEANING CATEGORIES
  const homeCleaningCategories = [
    { title: "Bungalow", size: "(80–150 sqm)", desc: "A single-story house with wider living spaces, ideal for\nfamilies." },
    { title: "Condominium Studio / 1BR", size: "Studio / 1BR (25–60 sqm)", desc: "A compact unit with one bedroom or open layout, ideal\nfor singles or couples." },
    { title: "Condominium 2BR", size: "(60–100 sqm)", desc: "A medium-sized condo unit with two bedrooms,\nsuited for small families." },
    { title: "Condominium Penthouse", size: "~150 sqm", desc: "A large, luxury unit at the top floor with spacious\nrooms and premium finishes." },
    { title: "Duplex", size: "Larger (150–200 sqm)", desc: "A bigger duplex unit with wider rooms and more\nfunctional areas for families." },
    { title: "Container House Single", size: "(10–20 sqm)", desc: "A compact home built from one container, often\nstudio-type." },
    { title: "Container House Multiple", size: "(30–50 sqm)", desc: "A larger house made from combined containers\nwith more functional spaces." },
    { title: "Stilt House Small", size: "(30–50 sqm)", desc: "A raised house on stilts, typically simple and\ncompact." },
    { title: "Stilt House Large", size: "(80–120 sqm)", desc: "A bigger elevated house with wider living and\nbedroom areas." },
    { title: "Mansion Smaller", size: "(300–500 sqm)", desc: "A large, multi-room residence with luxury\nfeatures and wide spaces." },
    { title: "Mansion Larger", size: "(600–1000 sqm)", desc: "A very spacious, high-end residence with\nmultiple floors and amenities." },
    { title: "Villa Smaller", size: "(100–250 sqm)", desc: "A private, medium-sized luxury house often with\na garden or outdoor space." },
    { title: "Villa Larger", size: "(300–1000 sqm)", desc: "A grand villa with expansive living areas, outdoor\nfeatures, and multiple rooms." },
  ];

  // AC CLEANING CATEGORIES
  const acCleaningCategories = [
    {
      title: "Window Type (0.5 HP – 1.5 HP)",
      price: "₱500/unit",
      desc: "Inclusions:\nUnit inspection before cleaning, Cleaning of front cover and air filter, Vacuum and wash of evaporator coil (indoor unit), Cleaning of blower and drain pan, Flushing of drain line to remove clogs, Wiping of outer casing, Test run after cleaning.",
    },
    {
      title: "Window Type (2.0 HP – 2.5 HP)",
      price: "₱700/unit",
      desc: "Inclusions:\nUnit inspection before cleaning, Cleaning of front cover and air filter, Vacuum and wash of evaporator coil (indoor unit), Cleaning of blower and drain pan, Flushing of drain line to remove clogs, Wiping of outer casing, Test run after cleaning.",
    },
    {
      title: "Split Type (0.5 HP – 1.5 HP)",
      price: "₱500/unit",
      desc: "Inclusions:\nUnit inspection before cleaning, Cleaning of front cover and air filter, Vacuum and wash of evaporator coil (indoor unit), Cleaning of blower and drain pan, Flushing of drain line to remove clogs, Wiping of outer casing, Test run after cleaning.",
    },
    {
      title: "Split Type (2.0 HP – 2.5 HP)",
      price: "₱700/unit",
      desc: "Inclusions:\nUnit inspection before cleaning, Cleaning of front cover and air filter, Vacuum and wash of evaporator coil (indoor unit), Cleaning of blower and drain pan, Flushing of drain line to remove clogs, Wiping of outer casing, Test run after cleaning.",
    },
    {
      title: "Split Type (3.0 HP and above)",
      price: "₱1,000/unit",
      desc: "Inclusions:\nUnit inspection before cleaning, Cleaning of front cover and air filter, Vacuum and wash of evaporator coil (indoor unit), Cleaning of blower and drain pan, Flushing of drain line to remove clogs, Wiping of outer casing, Test run after cleaning.",
    },
  ];

  // AC DEEP CLEANING (CHEMICAL CLEANING)
  const acDeepCleaningCategories = [
    {
      title: "Window Type (0.5 HP – 1.5 HP)",
      price: "₱1,500/unit",
      desc: "Inclusions:\nFull disassembly of unit, Chemical wash of evaporator coil & condenser, Cleaning of blower wheel, fan, and drain pan, Flushing of drain line & removal of heavy dirt/molds, Casing and filter washing, Thorough drying & reassembly, Test run and performance check.",
    },
    {
      title: "Window Type (2.0 HP – 2.5 HP)",
      price: "₱1,800/unit",
      desc: "Inclusions:\nFull disassembly of unit, Chemical wash of evaporator coil & condenser, Cleaning of blower wheel, fan, and drain pan, Flushing of drain line & removal of heavy dirt/molds, Casing and filter washing, Thorough drying & reassembly, Test run and performance check.",
    },
    {
      title: "Split Type (0.5 HP – 1.5 HP)",
      price: "₱1,500/unit",
      desc: "Inclusions:\nFull disassembly of unit, Chemical wash of evaporator coil & condenser, Cleaning of blower wheel, fan, and drain pan, Flushing of drain line & removal of heavy dirt/molds, Casing and filter washing, Thorough drying & reassembly, Test run and performance check.",
    },
    {
      title: "Split Type (2.0 HP – 2.5 HP)",
      price: "₱1,800/unit",
      desc: "Inclusions:\nFull disassembly of unit, Chemical wash of evaporator coil & condenser, Cleaning of blower wheel, fan, and drain pan, Flushing of drain line & removal of heavy dirt/molds, Casing and filter washing, Thorough drying & reassembly, Test run and performance check.",
    },
    {
      title: "Split Type (3.0 HP and above)",
      price: "₱2,000/unit",
      desc: "Inclusions:\nFull disassembly of unit, Chemical wash of evaporator coil & condenser, Cleaning of blower wheel, fan, and drain pan, Flushing of drain line & removal of heavy dirt/molds, Casing and filter washing, Thorough drying & reassembly, Test run and performance check.",
    },
  ];

  // Determine nav items and categories based on selectedService.
  const isIndoor = selectedService === "Indoor Services";
  const navItems = isIndoor
    ? ["Handyman", "Plumbing", "Electrical", "Appliance Repair", "Pest Control"]
    : [
        "Home Cleaning",
        "AC Cleaning",
        "AC Deep Cleaning (Chemical Cleaning)",
      ];

  // Select category list
  let categories: Array<any> = [];
  if (isIndoor) {
    if (selectedSubservice === "Handyman") {
      categories = [
        { title: "Inspection Fee", price: "₱300", desc: "Applies if service did not proceed\nInclusions:\nOn-site visit by a handyman, Assessment of repair/service needs, Basic recommendation, No actual repair or installation included" },
        { title: "Furniture Assembly - Small Items", price: "₱350 per unit", desc: "Inclusions:\nChair, stool, side table, shelves , Complete furniture assembly, Tightening of screws, bolts, and fittings, Alignment and stability check, Minor adjustments for proper function" },
        { title: "Furniture Assembly - Medium Items", price: "₱500 per unit", desc: "Inclusions:\nOffice table, study table, small cabinet, Complete furniture assembly, Tightening of screws, bolts, and fittings, Alignment and stability check, Minor adjustments for proper function" },
        { title: "Furniture Assembly - Large Items", price: "₱800 per unit", desc: "Inclusions:\nBed frame, wardrobe, big cabinet, Complete furniture assembly, Tightening of screws, bolts, and fittings, Alignment and stability check, Minor adjustments for proper function" },
        { title: "Door knob / Lock replacement", price: "₱400 per unit", desc: "Inclusions:\nRemoval of old hardware, Installation/replacement of knob, lock, or hinge, Proper alignment and door function test, Lubrication of moving parts (if needed)" },
        { title: "Door hinge replacement", price: "₱300 per unit", desc: "Inclusions:\nRemoval of old hardware, Installation/replacement of knob, lock, or hinge, Proper alignment and door function test, Lubrication of moving parts (if needed)" },
        { title: "Sliding door / Closet adjustment", price: "₱350 per unit", desc: "Inclusions:\nRemoval of old hardware, Installation/replacement of knob, lock, or hinge, Proper alignment and door function test, Lubrication of moving parts (if needed)" },
        { title: "Loose chair / Desk repair", price: "₱400 per unit", desc: "Inclusions:\nRe-tightening of screws, bolts, or hinges, Realignment of panels, drawers, or doors, Minor sanding, patching, or reinforcement, Functionality check after repair" },
        { title: "Cabinet alignment / Fix", price: "₱400", desc: "Inclusions:\nRe-tightening of screws, bolts, or hinges, Realignment of panels, drawers, or doors, Minor sanding, patching, or reinforcement, Functionality check after repair" },
        { title: "Minor wooden repairs", price: "₱400 per unit", desc: "Inclusions:\nRe-tightening of screws, bolts, or hinges, Realignment of panels, drawers, or doors, Minor sanding, patching, or reinforcement, Functionality check after repair" },
        { title: "Curtain rod / Blinds installations", price: "₱300 per unit", desc: "Inclusions:\nMeasuring and marking proper placement, Drilling and secure mounting with screws/anchors, Level and alignment check, Clean-up of minor dust/debris after work" },
        { title: "Mirror installation", price: "₱300", desc: "Inclusions:\nMeasuring and marking proper placement, Drilling and secure mounting with screws/anchors, Level and alignment check, Clean-up of minor dust/debris after work" },
      ];
    } else if (selectedSubservice === "Plumbing") {
      categories = [
        { title: "Inspection Fee", price: "₱300", desc: "Applies if service did not proceed\nInclusions:\nOn-site visit by a plumber, Assessment of repair/service needs, Basic recommendation, No actual repair or installation included" },
        { title: "Faucet leak repair", price: "₱350", desc: "Inclusions:\nDiagnosis of faucet leak (washer, cartridge, or seal issue), Minor tightening / washer replacement, Leak test after repair, Replacement faucet not included" },
        { title: "Pipe leak repair", price: "₱600", desc: "Inclusions:\nLocate and assess pipe leak, Apply sealing, patch, or minor joint repair, Pressure test after repair, Replacement pipe parts not included" },
        { title: "Clogged sink / Drain cleaning", price: "₱500", desc: "Inclusions:\nCheck and remove debris / blockage, Use of plumber's snake / pump if needed, Water flow test after clearing" },
        { title: "Toilet bowl clog removal", price: "₱650", desc: "Assessment of blockage, Manual unclogging or use of auger/pump, Flush test to ensure flow" },
        { title: "Toilet flash repair/ replacement", price: "₱700", desc: "Inclusions:\nCheck flush mechanism (valve, handle, tank parts), Minor adjustment or replacement of faulty parts, Functionality test after repair, Replacement parts not included" },
        { title: "Shower head installation / replacement", price: "₱400", desc: "Inclusions:\nRemoval of old shower head (if any), Installation of new shower head, Water pressure test to ensure function" },
        { title: "Water heater installation - Basic", price: "₱1,500", desc: "Inclusions:\nMounting of heater unit, Basic plumbing connection to water line, Leak and functionality check, Electrical wiring not included (separate fee)" },
        { title: "Pipe installation - New connection", price: "₱200", desc: "Inclusions:\nInstallation of short pipe line (sink, toilet, faucet connection), Sealing of joints to prevent leaks, Water pressure test" },
        { title: "Siphon / Trap replacement", price: "₱500", desc: "Inclusions:\nRemoval of old siphon or trap (sink or toilet), Installation of new part, Leak test after replacement" },
      ];
    } else if (selectedSubservice === "Electrical") {
      categories = [
        { title: "Inspection Fee", price: "₱300", desc: "Applies if service did not proceed\nInclusions:\nOn-site visit by electrician, Assessment of wiring / electrical issue, Basic recommendations / cost estimate, Repair not included" },
        { title: "Outlet installation / repair", price: "₱400 per outlet", desc: "Inclusions:\nMounting of new outlet or repair of damaged one, Electrical connection and safety check, Test using appliance or tester" },
        { title: "Light Switch repair", price: "₱400 per repair", desc: "Inclusions:\nRemoval of damaged socket (if any), Installation of new socket, Connection to existing wiring, Functionality and safety test" },
        { title: "Light installation", price: "₱500 per Clogged", desc: "Inclusions:\nSwitch installation, Installation of bulb socket / fixture, Power-on functionality Test" },
        { title: "Light switch replacement", price: "₱350 per replacement", desc: "Inclusions:\nCheck faulty switch, Replace or repair as needed, Test switch and connected light" },
        { title: "Circuit breaker installation / replacement", price: "₱500 per install/ replacement", desc: "Inclusions:\nRemoval of old breaker (if applicable), Installation of new breaker, Proper wiring connection, Functionality and safety test" },
        { title: "Ceiling fan installation", price: "₱500 per install", desc: "Inclusions:\nMount fan on ceiling, Proper electrical connection, Balance and functionality test" },
      ];
    } else if (selectedSubservice === "Pest Control") {
      categories = [
        // Termites Section
        { title: "TERMITES", price: "", desc: "Termite Control Services" },
        { title: "Termite Treatment: Floor Area: <50 sqm", price: "₱6,450", desc: "Inclusions:\nSite inspection, one-spot treatment of affected areas, wood & cement drenching, and mound destruction." },
        { title: "Termite Treatment: Floor Area: 51-100 sqm", price: "₱8,950", desc: "Inclusions:\nSite inspection, one-spot treatment of affected areas, wood & cement drenching, and mound destruction." },
        { title: "Termite Treatment: Floor Area: 101-150 sqm", price: "₱12,450", desc: "Inclusions:\nSite inspection, one-spot treatment of affected areas, wood & cement drenching, and mound destruction." },
        { title: "Termite Treatment: Floor Area: 151-200 sqm", price: "₱15,450", desc: "Inclusions:\nSite inspection, one-spot treatment of affected areas, wood & cement drenching, and mound destruction." },

        // Ants Section
        { title: "ANTS", price: "", desc: "Ant Control Services" },
        { title: "Ant Treatment: Floor Area: <50 sqm", price: "₱1,899", desc: "Inclusions:\nApplication of baits & residual spray, crack & crevice treatment, prevention tips." },
        { title: "Ant Treatment: Floor Area: 51-100 sqm", price: "₱2,899", desc: "Inclusions:\nApplication of baits & residual spray, crack & crevice treatment, prevention tips." },
        { title: "Ant Treatment: Floor Area: 101-150 sqm", price: "₱3,899", desc: "Inclusions:\nApplication of baits & residual spray, crack & crevice treatment, prevention tips." },
        { title: "Ant Treatment: Floor Area: 151-200 sqm", price: "₱4,899", desc: "Inclusions:\nApplication of baits & residual spray, crack & crevice treatment, prevention tips." },

        // Cockroaches Section
        { title: "COCKROACHES", price: "", desc: "Cockroach Control Services" },
        { title: "Cockroaches Treatment: Floor Area: <50 sqm", price: "₱1,899", desc: "Inclusions:\nSpraying for kitchens, bathrooms, and food areas, bait application, and prevention tips." },
        { title: "Cockroaches Treatment: Floor Area: 51-100 sqm", price: "₱2,899", desc: "Inclusions:\nSpraying for kitchens, bathrooms, and food areas, bait application, and prevention tips." },
        { title: "Cockroaches Treatment: Floor Area: 101-150 sqm", price: "₱3,899", desc: "Inclusions:\nSpraying for kitchens, bathrooms, and food areas, bait application, and prevention tips." },
        { title: "Cockroaches Treatment: Floor Area: 151-200 sqm", price: "₱4,899", desc: "Inclusions:\nSpraying for kitchens, bathrooms, and food areas, bait application, and prevention tips." },

        // Bed Bugs Section
        { title: "BED BUGS", price: "", desc: "Bed Bug Control Services" },
        { title: "Bed Bugs Treatment: Floor Area: <50 sqm", price: "₱2,899", desc: "Inclusions:\nHeat/steam treatment, residual spray, vacuuming, and prevention tips." },
        { title: "Bed Bugs Treatment: Floor Area: 51-100 sqm", price: "₱3,899", desc: "Inclusions:\nHeat/steam treatment, residual spray, vacuuming, and prevention tips." },
        { title: "Bed Bugs Treatment: Floor Area: 101-150 sqm", price: "₱4,899", desc: "Inclusions:\nHeat/steam treatment, residual spray, vacuuming, and prevention tips." },
        { title: "Bed Bugs Treatment: Floor Area: 151-200 sqm", price: "₱5,899", desc: "Inclusions:\nHeat/steam treatment, residual spray, vacuuming, and prevention tips." },
      ];
    } else if (selectedSubservice === "Appliance Repair") {
      categories = [
        { title: "Inspection Fee", price: "₱300", desc: "Applies if service did not proceed\nInclusions:\nOn-site visit by technician, Basic checking & assessment of appliance, Diagnosis of issues & repair needs, Estimate/quotation for actual repair" },
        { title: "Refrigerator Repair", price: "₱800 per unit", desc: "Inclusions:\nOn-site visit by technician, Diagnostic check of cooling system, thermostat, compressor, Cleaning of condenser coils (if needed), Basic troubleshooting & recommendations, Replacement parts not included" },
        { title: "Commercial Freezer Repair", price: "₱1,000 per unit", desc: "Inclusions:\nOn-site visit by technician, Inspection of freezer motor & compressor, Check for leaks, thermostat, fan & wiring issues, Temperature test & calibration, Replacement parts not included" },
        { title: "TV Repair (Up to 50\")", price: "₱500 per unit", desc: "Inclusions:\nOn-site visit by technician, Panel & circuit board check, Diagnosis of screen, sound, or power issues, Basic cleaning of internal board & vents, Replacement parts not included" },
        { title: "TV Repair (51\" to 70\")", price: "₱800 per unit", desc: "Inclusions:\nOn-site visit by technician, Panel & circuit board check, Diagnosis of screen, sound, or power issues, Basic cleaning of internal board & vents, Replacement parts not included" },
        { title: "TV Repair (71\" to 90\")", price: "₱1,000 per unit", desc: "Inclusions:\nOn-site visit by technician, Panel & circuit board check, Diagnosis of screen, sound, or power issues, Basic cleaning of internal board & vents, Replacement parts not included" },
        { title: "TV Installation", price: "₱300 per unit", desc: "Inclusions:\nWall mounting or stand setup, Secure wiring & cable management, Testing & demo for client, Bracket not included" },
        { title: "Washing Machine Repair", price: "₱800 per unit", desc: "Inclusions:\nOn-site visit by technician, Diagnostic check of motor, pump, & wiring, Spin, rinse, and water inlet test, Cleaning of accessible filters, Replacement parts not included" },
        { title: "Washing Machine Cleaning Top Load", price: "₱500 per unit", desc: "Inclusions:\nDrum cleaning & descaling, Removal of dirt, lint, & soap residue, Exterior wipe-down" },
        { title: "Washing Machine Cleaning Front Load", price: "₱700 per unit", desc: "Inclusions:\nDrum cleaning & descaling, Removal of dirt, lint, & soap residue, Exterior wipe-down" },
        { title: "Stand Fan Repair", price: "₱500 per unit", desc: "Inclusions:\nOn-site visit by technician, Motor & wiring inspection, Bearing & blade cleaning, Switch & speed test, Replacement parts not included" },
        { title: "Tower Fan Repair", price: "₱700 per unit", desc: "Inclusions:\nOn-site visit by technician, Motor and electronic panel check, Cleaning & lubrication of fan mechanism, Speed & oscillation test, Replacement parts not included" },
        { title: "Range Hood Repair", price: "₱600 per unit", desc: "Inclusions:\nOn-site visit by technician, Motor, filter, and switch inspection, Cleaning of grease & dirt buildup, Basic troubleshooting, Replacement parts not included" },
        { title: "Range Hood Installation", price: "₱800 per unit", desc: "Inclusions:\nOn-site visit by technician, Proper mounting & setup, Electrical connection & testing, Smoke test for suction function" },
        { title: "Microwave Repair – Small", price: "₱450 per unit", desc: "Inclusions:\nOn-site visit by technician, Inspection of magnetron, fuse, & panel, Door seal & safety check, Heating function test, Replacement parts not included" },
        { title: "Microwave Repair – Medium", price: "₱700 per unit", desc: "Inclusions:\nOn-site visit by technician, Inspection of magnetron, fuse, & panel, Door seal & safety check, Heating function test, Replacement parts not included" },
        { title: "Microwave Repair – Large", price: "₱850 per unit", desc: "Inclusions:\nOn-site visit by technician, Inspection of magnetron, fuse, & panel, Door seal & safety check, Heating function test, Replacement parts not included" },
        { title: "Oven Repair", price: "₱750 per unit", desc: "Inclusions:\nOn-site visit by technician, Check heating elements, thermostat, & wiring, Panel inspection & temperature test, Basic cleaning of accessible parts, Replacement parts not included" },
        { title: "Rice Cooker Repair", price: "₱400 per unit", desc: "Inclusions:\nOn-site visit by technician, Basic checking & assessment of appliance, Diagnosis of issues & repair needs, Estimate/quotation for actual repair, Replacement parts not included" },
      ];
    } else {
      // Placeholder for other indoor subservices
      categories = [
        { title: `${selectedSubservice} - Service`, price: "Contact for price", desc: "Details will be added soon." },
      ];
    }
  } else {
    categories =
      selectedService === "Home Cleaning"
        ? homeCleaningCategories
        : selectedService === "AC Cleaning"
        ? acCleaningCategories
        : acDeepCleaningCategories;
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
  <Text style={styles.headerText}>{isIndoor ? 'Indoor Services' : 'Cleaning Services'}</Text>
      </View>

      {/* Scrollable Nav */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.navContainer}>
        {navItems.map((service, index) => (
          <View key={index} style={styles.navItem}>
            <TouchableOpacity
              onPress={() => {
                if (isIndoor) {
                  setSelectedSubservice(service);
                } else {
                  setSelectedService(service);
                }
              }}
            >
              <Text
                style={[
                  styles.navText,
                  (isIndoor ? selectedSubservice === service : selectedService === service) && styles.activeNavText,
                ]}
              >
                {service}
              </Text>
            </TouchableOpacity>
            {index !== navItems.length - 1 && <Text style={styles.navDivider}>|</Text>}
          </View>
        ))}
      </ScrollView>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryBox,
              (isIndoor
                ? selectedCategoryMap[selectedService][selectedSubservice] === item.title
                : selectedCategoryMap[selectedService] === item.title) && styles.selectedBox,
            ]}
            onPress={() =>
              setSelectedCategoryMap((prev: any) => {
                const copy = { ...prev };
                if (isIndoor) {
                  copy[selectedService] = { ...copy[selectedService], [selectedSubservice]: item.title };
                } else {
                  copy[selectedService] = item.title;
                }
                return copy;
              })
            }
          >
            <View style={styles.categoryTextContainer}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
              {'size' in item && item.size && (
                <Text style={styles.categorySize}>{item.size}</Text>
              )}
              {'price' in item && item.price && (
                <Text style={styles.categorySize}>{item.price}</Text>
              )}
              <Text style={styles.categoryDesc}>{item.desc}</Text>
            </View>
            <View style={styles.radioCircle}>
              {(isIndoor
                ? selectedCategoryMap[selectedService][selectedSubservice] === item.title
                : selectedCategoryMap[selectedService] === item.title) && (
                <View style={styles.radioInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  headerText: { fontSize: 22, fontWeight: "bold", marginLeft: 8, color: "black" },

  navContainer: { flexDirection: "row", marginBottom: 20 },
  navItem: { flexDirection: "row", alignItems: "center" },
  navText: { fontSize: 16, color: "black", paddingHorizontal: 8, paddingVertical: 4 },
  activeNavText: {
    borderBottomWidth: 3,
    borderBottomColor: "cyan",
    fontWeight: "600",
  },
  navDivider: { color: "black", fontSize: 18, alignSelf: "center" },

  categoriesContainer: { marginBottom: 30 },
  categoryBox: {
    flexDirection: "row",
    backgroundColor: "#DEE1E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedBox: { borderWidth: 2, borderColor: "cyan" },
  categoryTextContainer: { flex: 1, marginRight: 10 },
  categoryTitle: { fontSize: 16, fontWeight: "bold", color: "black" },
  categorySize: { fontSize: 14, color: "black", marginBottom: 4 },
  categoryDesc: { fontSize: 14, color: "black", lineHeight: 18 },

  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: { height: 12, width: 12, borderRadius: 6, backgroundColor: "black" },

  nextButton: {
    backgroundColor: "#3DC1C6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  nextButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
