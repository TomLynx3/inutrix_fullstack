package com.rtu.iNutrix.utilities.deserializers;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.rtu.iNutrix.models.DTO.Meals.DietGoal;

import java.io.IOException;

public class DietGoalDeserializer extends JsonDeserializer<DietGoal> {

    @Override
    public DietGoal deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {

        ObjectCodec oc = jsonParser.getCodec();
        JsonNode node = oc.readTree(jsonParser);

        if (node == null) {
            return null;
        }

        String text = node.textValue(); //

        if (text == null) {
            return null;
        }


        return DietGoal.fromText(text);
    }
}
