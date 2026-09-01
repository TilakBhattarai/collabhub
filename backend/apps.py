class Father:
    def skills(self):
        print("Father: Gardening")


class Mother:
    def skills(self):
        print("Mother: Painting")


class Child(Father, Mother):
    def skills(self):
        super().skills()
        print("Child: Reading")


c = Child()
c.skills()
