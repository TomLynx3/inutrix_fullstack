package com.rtu.iNutrix.utilities.deserializers;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.rtu.iNutrix.models.DTO.Meals.DietGoal;
import com.rtu.iNutrix.models.DTO.Meals.MealType;

import java.io.IOException;

public class MealTypeDeserializer extends JsonDeserializer<MealType> {

    @Override
    public MealType deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {

        ObjectCodec oc = jsonParser.getCodec();
        JsonNode node = oc.readTree(jsonParser);

        if (node == null) {
            return null;
        }

        String text = node.textValue(); //

        if (text == null) {
            return null;
        }


        return MealType.fromText(text);
    }
}
