package com.aerobridge.demo.Unit_tests;

import org.junit.jupiter.api.Test;

import com.aerobridge.demo.Controllers.AerobridgeId;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class AerobridgeIdTests {

    AerobridgeId aerobridgeId = mock(AerobridgeId.class);

    @Test // Tests if there are no duplicates created by the number generator
    public void testRandomNumberGenerator() {
        // Choose amount of numbers to be generated
        int numberOfElements = 10000;
        String idArray[] = new String[numberOfElements];
        boolean containsDuplicates = false;

        for (int i = 0; i < numberOfElements; i++) {
            idArray[i] = new String(aerobridgeId.generateId("A"));
        }
        for (int i = 0; i < idArray.length; i++) {
            for (int j = i + 1; j < idArray.length; j++) {
                if (idArray[i].equals(idArray[j])) {
                    System.out.println(idArray[j]);
                    containsDuplicates = true;
                }
            }
        }
        assertEquals(false, containsDuplicates);
    }

    @Test // Tests if the generated id has the correct format
    public void testAerobridgeIdGeneration() {
        AerobridgeId aerobridgeId = mock(AerobridgeId.class);
        String mockIdWithA = aerobridgeId.generateId("A");
        String mockIdWithB = aerobridgeId.generateId("B");

        assertEquals(mockIdWithA.charAt(0), 'A');
        assertEquals(mockIdWithA.charAt(1), '-');
        assertEquals(mockIdWithA.chars().count(), 8);

        assertEquals(mockIdWithB.charAt(0), 'B');
        assertEquals(mockIdWithB.charAt(1), '-');
        assertEquals(mockIdWithB.chars().count(), 8);
    }

}
