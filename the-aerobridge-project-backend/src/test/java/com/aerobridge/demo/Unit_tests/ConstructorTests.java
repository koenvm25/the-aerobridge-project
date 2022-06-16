package com.aerobridge.demo.Unit_tests;

import com.aerobridge.demo.Contructors.*;

import org.junit.jupiter.api.Test;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

// Er moet wat getest kunnen worden. dus alleen even testen op wat getters en setters is niet voldoende.
// Wat er nu staat is dus ook niet goed... Was leuk geprobeerd en weer even opgefrist.. Maar moeten we even anders doen.

class ConstructorTests {
	private final String DATESTR = "2022-06-07";
	private final Date DATE = Date.valueOf(DATESTR);

	private final String TIMESTR = "2022-06-07 12:00:00";
	private final Timestamp TIMESTAMP = Timestamp.valueOf(TIMESTR);

	private List<Component> MOCKLISTCOMPONENT = new ArrayList<>();
	private List<SerieMasterComponent> MOCKLISTSERIEMASTERCOMPONENT = new ArrayList<>();
	private List<Aircraft> MOCKLISTAIRCRAFT = new ArrayList<>();
	private List<Serie> MOCKLISTSERIE = new ArrayList<>();

	private final Serie MOCKSERIE = new Serie(1, "serieTest", 10, 10, 10, 99.99, 99.99, 99.99, DATE, DATE);
	private final Aircraft MOCKAIRCRAFT = new Aircraft(1, "aid1", "testManufacturer", "testOprerator", "testCategory",
			"testName", "testStatus", DATE, DATE);
	private final MasterComponent MOCKMASTERCOMP = new MasterComponent(1, 10, TIMESTAMP, 99.99, 5, "testName",
			"testSoutce", "testFamily", "testFavStore", 12354657890L, DATE, DATE);
	private final Model MOCKMODEL = new Model(1, "TestModelName", "TestModelPopularName", "TestCatogory", DATE, DATE);

	// TESTS: Constructors
	///////////////////////////////////////////////////////////////////////

	// Constructor test of aircraft. Testing the getters and setters
	@Test
	void aircraftConstTest() {
		Aircraft testAircraft = new Aircraft();

		MOCKLISTCOMPONENT.add(new Component());

		testAircraft.setAircraftId(1);
		testAircraft.setAerobridgeId("AID");
		testAircraft.setManufacturer("TestManufacturer");
		testAircraft.setOperator("TestOperator");
		testAircraft.setCategory("TestCategory");
		testAircraft.setName("TestAircraftName");
		testAircraft.setStatus("TestAircraftStatus");
		testAircraft.setCreatedAt(DATE);
		testAircraft.setUpdatedAt(DATE);

		testAircraft.setComponents(MOCKLISTCOMPONENT);
		testAircraft.setSerie(MOCKSERIE);

		assertEquals(testAircraft.getAircraftId(), 1);
		assertEquals(testAircraft.getAerobridgeId(), "AID");
		assertEquals(testAircraft.getManufacturer(), "TestManufacturer");
		assertEquals(testAircraft.getOperator(), "TestOperator");
		assertEquals(testAircraft.getCategory(), "TestCategory");
		assertEquals(testAircraft.getName(), "TestAircraftName");
		assertEquals(testAircraft.getStatus(), "TestAircraftStatus");
		assertEquals(testAircraft.getCreatedAt(), DATE);
		assertEquals(testAircraft.getUpdatedAt(), DATE);
		assertEquals(testAircraft.getComponents(), MOCKLISTCOMPONENT);
		assertEquals(testAircraft.getSerie(), MOCKSERIE);
	}

	// Constructor test of master component. Testing the getters and setters
	@Test
	void masterCompConstTest() {
		MasterComponent testMasterComp = new MasterComponent();

		MOCKLISTCOMPONENT.add(new Component());

		MOCKLISTSERIEMASTERCOMPONENT.add(new SerieMasterComponent());

		testMasterComp.setMasterComponentId(1);
		testMasterComp.setAvailableStock(10);
		testMasterComp.setPriceUpdatedAt(TIMESTAMP);
		testMasterComp.setLatestPrice(99.99);
		testMasterComp.setMinimalStock(5);
		testMasterComp.setName("TestMasterCompTestName");
		testMasterComp.setSource("Test.www.testsource.com");
		testMasterComp.setFamily("TestFamily");
		testMasterComp.setFavouriteStore("TestStore");
		testMasterComp.setGtinId(1234567890L);
		testMasterComp.setCreatedAt(DATE);
		testMasterComp.setUpdatedAt(DATE);

		testMasterComp.setComponents(MOCKLISTCOMPONENT);
		testMasterComp.setSeries(MOCKLISTSERIEMASTERCOMPONENT);

		assertEquals(testMasterComp.getMasterComponentId(), 1);
		assertEquals(testMasterComp.getAvailableStock(), 10);
		assertEquals(testMasterComp.getPriceUpdatedAt(), TIMESTAMP);
		assertEquals(testMasterComp.getLatestPrice(), 99.99);
		assertEquals(testMasterComp.getMinimalStock(), 5);
		assertEquals(testMasterComp.getName(), "TestMasterCompTestName");
		assertEquals(testMasterComp.getSource(), "Test.www.testsource.com");
		assertEquals(testMasterComp.getFamily(), "TestFamily");
		assertEquals(testMasterComp.getFavouriteStore(), "TestStore");
		assertEquals(testMasterComp.getGtinId(), 1234567890L);
		assertEquals(testMasterComp.getCreatedAt(), DATE);
		assertEquals(testMasterComp.getUpdatedAt(), DATE);
		assertEquals(testMasterComp.getComponents(), MOCKLISTCOMPONENT);
		assertEquals(testMasterComp.getSeries(), MOCKLISTSERIEMASTERCOMPONENT);
	}

	// Constructor test of component. Testing the getters and setters
	@Test
	void componentConstTest() {
		Component testComponent = new Component();
		testComponent.setComponentId(1);
		testComponent.setAerobridgeId("AID");
		testComponent.setName("TestComponentName");
		testComponent.setStatus("TestComponentStatus");
		testComponent.setLocation("TestComponentLocation");
		testComponent.setUpdatedAt(DATE);
		testComponent.setCreatedAt(DATE);

		testComponent.setMasterComponent(MOCKMASTERCOMP);
		testComponent.setAircraft(MOCKAIRCRAFT);

		assertEquals(testComponent.getComponentId(), 1);
		assertEquals(testComponent.getAerobridgeId(), "AID");
		assertEquals(testComponent.getName(), "TestComponentName");
		assertEquals(testComponent.getStatus(), "TestComponentStatus");
		assertEquals(testComponent.getLocation(), "TestComponentLocation");
		assertEquals(testComponent.getUpdatedAt(), DATE);
		assertEquals(testComponent.getCreatedAt(), DATE);
		assertEquals(testComponent.getMasterComponent(), MOCKMASTERCOMP);
		assertEquals(testComponent.getAircraft(), MOCKAIRCRAFT);
	}

	// Constructor test of model. Testing the getters and setters
	@Test
	void modelConstTest() {

		MOCKLISTSERIE.add(new Serie());

		Model testModel = new Model();
		testModel.setModelId(1);
		testModel.setName("TestName");
		testModel.setPopularName("TestPopularName");
		testModel.setCategory("TestCategory");
		testModel.setCreatedAt(DATE);
		testModel.setUpdatedAt(DATE);

		testModel.setSeries(MOCKLISTSERIE);

		assertEquals(testModel.getModelId(), 1);
		assertEquals(testModel.getName(), "TestName");
		assertEquals(testModel.getPopularName(), "TestPopularName");
		assertEquals(testModel.getCategory(), "TestCategory");
		assertEquals(testModel.getCreatedAt(), DATE);
		assertEquals(testModel.getUpdatedAt(), DATE);
		assertEquals(testModel.getSeries(), MOCKLISTSERIE);
	}

	// Constructor test of Serie master component. Testing the getters and setters
	@Test
	void serieMasterComponentConstructorTest() {
		SerieMasterComponent testSMC = new SerieMasterComponent();
		testSMC.setSerieMasterComponentId(10);
		testSMC.setQuantity(1);

		testSMC.setSerie(MOCKSERIE);
		testSMC.setMasterComponent(MOCKMASTERCOMP);

		assertEquals(testSMC.getSerieMasterComponentId(), 10);
		assertEquals(testSMC.getQuantity(), 1);
		assertEquals(testSMC.getSerie(), MOCKSERIE);
		assertEquals(testSMC.getMasterComponent(), MOCKMASTERCOMP);
	}

	// Constructor test of serie. Testing the getters and setters
	@Test
	void serieConstTest() {

		MOCKLISTSERIEMASTERCOMPONENT.add(new SerieMasterComponent());
		MOCKLISTAIRCRAFT.add(new Aircraft());

		Serie testSerie = new Serie();
		testSerie.setSerieId(1);
		testSerie.setSerie("TestSerie");
		testSerie.setDimensionLength(123);
		testSerie.setDimensionWidth(123);
		testSerie.setDimensionHeight(123);
		testSerie.setMaxRange(1.1);
		testSerie.setMaxSpeed(1.1);
		testSerie.setMaxEndurance(1.1);
		testSerie.setCreatedAt(DATE);
		testSerie.setUpdatedAt(DATE);

		testSerie.setModel(MOCKMODEL);
		testSerie.setMasterComponents(MOCKLISTSERIEMASTERCOMPONENT);
		testSerie.setAircrafts(MOCKLISTAIRCRAFT);

		assertEquals(testSerie.getSerieId(), 1);
		assertEquals(testSerie.getSerie(), "TestSerie");
		assertEquals(testSerie.getDimensionLength(), 123);
		assertEquals(testSerie.getDimensionWidth(), 123);
		assertEquals(testSerie.getDimensionHeight(), 123);
		assertEquals(testSerie.getMaxRange(), 1.1);
		assertEquals(testSerie.getMaxSpeed(), 1.1);
		assertEquals(testSerie.getMaxEndurance(), 1.1);
		assertEquals(testSerie.getCreatedAt(), DATE);
		assertEquals(testSerie.getUpdatedAt(), DATE);
		assertEquals(testSerie.getModel(), MOCKMODEL);
		assertEquals(testSerie.getMasterComponents(), MOCKLISTSERIEMASTERCOMPONENT);
		assertEquals(testSerie.getAircrafts(), MOCKLISTAIRCRAFT);
	}

	// Constructor test of webscraper. Testing the getter and setter
	@Test
	void webscraperConstructorTest() {
		Webscraper testWebscraper = new Webscraper("");
		testWebscraper.setUrl("Passed");

		assertEquals(testWebscraper.getUrl(), "Passed");
	}

}
