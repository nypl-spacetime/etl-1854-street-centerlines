# NYC Space/Time Directory ETL module: NYC Historical Streets

[ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load) module for NYPL’s [NYC Space/Time Direcory](http://spacetime.nypl.org/). This Node.js module downloads, parses, and/or transforms NYC Historical Streets data, and creates a NYC Space/Time Directory dataset.


## Data

The dataset created by this ETL module’s `transform` step can be found in the [data section of the NYC Space/Time Directory website](http://spacetime.nypl.org/#data-nyc-streets).

## Details

<table>
<tbody>

    <tr>
    <td>ID</td>
    <td><code>nyc-streets</code></td>
    </tr>

    <tr>
    <td>Title</td>
    <td>NYC Historical Streets</td>
    </tr>

    <tr>
    <td>Description</td>
    <td>Historical streets traced from New York City fire insurance atlases and other maps</td>
    </tr>

    <tr>
    <td>License</td>
    <td>CC0</td>
    </tr>

    <tr>
    <td>Contributors</td>
    <td>Mauricio Giraldo (author)<br />
Bert Spaan (wrangler)</td>
    </tr>

    <tr>
    <td>Sources</td>
    <td><a href="https://github.com/nypl-spacetime/nyc-historical-streets">Shapefiles with streets traced from a selection of Map Warper layers</a></td>
    </tr>

    <tr>
    <td>Homepage</td>
    <td><a href="https://github.com/nypl-spacetime/nyc-historical-streets">https://github.com/nypl-spacetime/nyc-historical-streets</a></td>
    </tr>
</tbody>
</table>

[JSON Schema](http://json-schema.org/) of Object data:

```json
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "layerId": {
      "type": "string",
      "description": "ID of Map Warper layer where street was traced from"
    },
    "borough": {
      "type": "string",
      "description": "Borough where street is located in"
    },
    "originalName": {
      "type": "string",
      "description": "Original name from Shapefile, before normalization"
    }
  },
  "required": [
    "layerId",
    "borough",
    "originalName"
  ]
}
```

## Available steps

  - `download`
  - `transform`

## Usage

```
git clone https://github.com/nypl-spacetime/etl-nyc-streets.git /path/to/etl-modules
cd /path/to/etl-modules/etl-nyc-streets
npm install

spacetime-etl nyc-streets[.<step>]
```

See http://github.com/nypl-spacetime/spacetime-etl for information about Space/Time's ETL tool. More Space/Time ETL modules [can be found on GitHub](https://github.com/search?utf8=%E2%9C%93&q=org%3Anypl-spacetime+etl-&type=Repositories&ref=advsearch&l=&l=).

_This README file is generated by [generate-etl-readme](https://github.com/nypl-spacetime/generate-etl-readme)._
