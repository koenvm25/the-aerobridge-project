package com.aerobridge.demo.Integration_tests;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import javax.inject.Inject;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AircraftApiTest {

    @Inject
    private MockMvc mvc;

    @Before
    public void setUp() throws Exception {

    }

    @Test
    public void testAircraftApiGetAircraftById() throws Exception {
        mvc.perform(get("/aircraft/187")).andExpect(status().isOk());
    }

}
