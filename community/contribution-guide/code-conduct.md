# Code of Conduct

The following Code of Conduct is based on full compliance with the [Apache Software Foundation Code of Conduct](https://www.apache.org/foundation/policies/conduct.html).

## Development philosophy
 - **Consistent** code style, naming, and usage are consistent.  
 - **Easy to read** code is obvious, easy to read and understand, when debugging one knows the intent of the code.
 - **Abstract** hierarchy is clear and the concepts are refined and reasonable. Keep methods, classes, packages, and modules at the same level of abstraction.
 - **Heart** Maintain a sense of responsibility and continue to be carved in the spirit of artisans.
 
## Development specifications

 - Executing `make test` can compile and test through all test cases. 
 - Follow the coding specifications.

## Coding specifications

 - Use linux line breaks.
 - Indentation (including empty lines) is consistent with the last line.
 - There should be no meaningless empty lines.
 - Classes, methods, and variables should be named as the name implies and abbreviations should be avoided.
 - Logs and notes are always in English.

## Unit test specifications

 - Test code and production code are subject to the same code specifications.
 - Unit tests are subject to AIR (Automatic, Independent, Repeatable) Design concept.
   - Automatic: Unit tests should be fully automated, not interactive. Manual checking of output results is prohibited, `System.out`, `log`, etc. are not allowed, and must be verified with assertions. 
   - Independent: It is prohibited to call each other between unit test cases and to rely on the order of execution. Each unit test can be run independently.
   - Repeatable: Unit tests cannot be affected by the external environment and can be repeated. 
 - Unit tests are subject to BCDE（Border, Correct, Design, Error) Design principles.
   - Border (Boundary value test): The expected results are obtained by entering the boundaries of loop boundaries, special values, data order, etc.
   - Correct (Correctness test): The expected results are obtained with the correct input.
   - Design (Rationality Design): Design high-quality unit tests in combination with production code design.
   - Error (Fault tolerance test): The expected results are obtained through incorrect input such as illegal data, abnormal flow, etc.
 - If there is no special reason, the test needs to be fully covered.
 - Each test case needs to be accurately asserted.
 - Prepare the environment for code separation from the test code.

 - Public specifications.
   - Each line is no longer than `200` in length, ensuring that each line is semantically complete for easy understanding.
