import { buildEntityCallbacks, buildCollection, buildProperty } from "firecms";

interface Car {
  brand_name: string;
  model_name: string;
  fuel_type: "diesel" | "gas";
  horse_power: number;
  price_in_dollars: number;
  modified_at?: Date;
  modified_by?: string;
}

const carsCallbacks = buildEntityCallbacks<Car>({
  onPreSave: (entitySaveProps) => {
    console.log("Callback onPreSave<Car>");
    entitySaveProps.values.modified_at = new Date();
    entitySaveProps.values.modified_by = entitySaveProps.context.authController.user?.displayName ?? "Unknown User";
    return entitySaveProps.values;
  },
  onPreDelete: (entityDeleteProps) => {
    console.log("Callback onPreDelete<Car>");
    if (entityDeleteProps.context.authController.user?.displayName !== entityDeleteProps.entity.modified_by) {
      throw new Error("You cannot a car that wasn't created by yourself");
    }
  },

});

export const carsCollection = buildCollection<Car>({
  id: "cars",
  name: "Cars",
  path: "car",
  callbacks: carsCallbacks,
  singularName: "Car",
  properties: {
    brand_name: buildProperty({
      dataType: "string",
      name: "Brand Name",
      validation: {
        required: true
      },
      enumValues: [
        {
          id: "alfa-romero",
          label: "Alfa Romero"
        },
        {
          id: "audi",
          label: "Audi"
        },
        {
          id: "bmw",
          label: "Bmw"
        },
        {
          label: "Mercedes Benz",
          id: "mercedes-benz"
        },
        {
          id: "porsche",
          label: "Porsche"
        }
      ]
    }),
    model_name: buildProperty({
      dataType: "string",
      name: "Model Name",
      validation: {
        required: true
      }
    }),
    fuel_type: buildProperty({
      validation: {
        required: true
      },
      dataType: "string",
      enumValues: [
        {
          label: "Diesel",
          id: "diesel"
        },
        {
          id: "gas",
          label: "Gas"
        },
        {
          id: "electric",
          label: "Electric"
        }
      ],
      name: "Fuel type"
    }),
    horse_power: buildProperty({
      validation: {
        required: true
      },
      name: "Horse Power",
      dataType: "number"
    }),
    price_in_dollars: buildProperty({
      dataType: "number",
      validation: {
        required: true
      },
      name: "Price in Dollars"
    }),
    modified_at: buildProperty({
      dataType: "date",
      name: "Modified At",
      validation: {
        required: false
      },
      readOnly: true
    }),
    modified_by: buildProperty({
      dataType: "string",
      name: "Modified By",
      validation: {
        required: false
      },
      readOnly: true
    })
  }
});
